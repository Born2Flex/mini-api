import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from "./dto/login.dto";
import { CustomSession } from "./session/session.interface";
import { UserDto } from "../users/dto/user.dto";
import { User } from '../users/entity/user.entity';
import { GoogleUser } from "./dto/google-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDto, session: CustomSession): Promise<void> {
    const user = await this.usersService.findUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    session.userId = user.id;
  }

  async logout(session: CustomSession): Promise<void> {
    await new Promise<void>((resolve, reject) =>
        session.destroy(err => (err ? reject(err) : resolve())),
    ).catch((err) => {
      throw new InternalServerErrorException(`Failed to destroy session: ${err?.message ?? 'unknown'}`);
    });
  }

  async validateGoogleUser(googleUser: GoogleUser): Promise<UserDto> {
    const { email, firstName, lastName } = googleUser;
    const user: User | null = await this.usersService.findUserByEmail(email);

    if (user) {
      return user;
    }

    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    return await this.usersService.createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
  }

  async googleLogin(user: any, session: CustomSession): Promise<void> {
    if (!user) {
      throw new UnauthorizedException('No user from Google');
    }

    session.userId = user.id;
  }
}
