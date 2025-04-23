import { Controller, Post, Body, Req, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginDto } from "./dto/login.dto";
import { CustomSession } from "../utils/guards/session.interface";
import { Public } from '../utils/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({summary: 'Login user'})
  @ApiResponse({status: 200, description: 'User logged in successfully'})
  @ApiResponse({status: 401, description: 'Invalid credentials'})
  async login(@Body() loginDto: LoginDto, @Req() req: Request & {session: CustomSession}): Promise<void> {
    await this.authService.login(loginDto, req.session);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({summary: 'Logout user'})
  @ApiResponse({status: 200, description: 'User logged out successfully'})
  async logout(@Req() req: Request & {session: CustomSession}): Promise<void> {
    await this.authService.logout(req.session);
  }
}
