import { Controller, Post, Body, Req, HttpCode, Get, UseGuards, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from "./dto/login.dto";
import { CustomSession } from "../utils/guards/session.interface";
import { Public } from '../utils/decorators/public.decorator';
import { GoogleAuthGuard } from "../utils/guards/google-auth.guard";

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

  @Public()
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({summary: 'Login with Google'})
  @ApiResponse({status: 200, description: 'Redirects to Google authentication'})
  async googleAuth(): Promise<void> {
    // This method doesn't need to do anything, the @UseGuards decorator handles the authentication
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({summary: 'Google authentication callback'})
  @ApiResponse({status: 200, description: 'User logged in successfully with Google'})
  @ApiResponse({status: 401, description: 'Google authentication failed'})
  async googleAuthCallback(@Req() req: Request & {session: CustomSession, user: any}, @Res() res: Response): Promise<void> {
    await this.authService.googleLogin(req.user, req.session);
    res.redirect('/me');
  }
}
