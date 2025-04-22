import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { RegistrationDto, UserDto } from './dto/user.dto';

@Injectable()
export class UsersMapper {
  toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
    };
  }

  toEntity(dto: RegistrationDto): User {
    return Object.assign(new User(), dto);
  }
} 
