import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { RegistrationDto, UserDto } from "./dto/user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly authService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() registerDto: RegistrationDto): Promise<UserDto> {
    return this.authService.createUser(registerDto);
  }
}
