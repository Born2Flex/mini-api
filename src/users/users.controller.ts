import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { UserDto } from "./dto/user.dto";
import { RegistrationDto } from "./dto/registration.dto";
import { SessionGuard } from "../utils/guards/session.guard";

@ApiTags('Users')
@UseGuards(SessionGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() registerDto: RegistrationDto): Promise<UserDto> {
    return this.usersService.createUser(registerDto);
  }
}
