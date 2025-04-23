import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './entity/user.entity';
import { UserDto } from "./dto/user.dto";
import { UsersMapper } from './users.mapper';
import { RegistrationDto } from "./dto/registration.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly mapper: UsersMapper
  ) {}

  async createUser(registrationDto: RegistrationDto): Promise<UserDto> {
    const existingUser = await this.findUserByEmail(registrationDto.email);
    if (existingUser) {
      throw new ConflictException('User with such email already exists');
    }

    const user = this.mapper.toEntity(registrationDto);
    const saved = await this.usersRepository.save(user);

    return this.mapper.toDto(saved);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({where: {email}});
  }

  async findUserById(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.mapper.toDto(user);
  }
}
