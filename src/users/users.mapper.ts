import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { RegistrationDto } from "./dto/registration.dto";

@Injectable()
export class UsersMapper {
  toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  toEntity(dto: RegistrationDto): User {
    return Object.assign(new User(), dto);
  }
} 
