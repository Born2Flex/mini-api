import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from "./dto/login.dto";
import { CustomSession } from "../utils/guards/session.interface";
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
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
