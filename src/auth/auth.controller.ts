import { Controller, Post, Body, Req, Get, UseGuards, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from "./dto/login.dto";
import { CustomSession } from "./session/session.interface";
import { GoogleAuthGuard } from "../utils/guards/google-auth.guard";
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { Public } from "../utils/decorators/public.decorator";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  @ApiOperation({summary: 'Login user'})
  @ApiResponse({status: 200, description: 'User logged in successfully'})
  @ApiResponse({status: 401, description: 'Invalid credentials'})
  async login(@Body() loginDto: LoginDto, @Req() req: Request & {session: CustomSession}): Promise<void> {
    await this.authService.login(loginDto, req.session);
  }

  @Post('logout')
  @ApiOperation({summary: 'Logout user'})
  @ApiResponse({status: 200, description: 'User logged out successfully'})
  async logout(@Req() req: Request & {session: CustomSession}): Promise<void> {
    await this.authService.logout(req.session);
  }

  @Get('google/login')
  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({summary: 'Login with Google'})
  @ApiResponse({status: 200, description: 'Redirects to Google authentication'})
  async googleAuth(): Promise<void> {
    // @UseGuards decorator handles the authentication
  }

  @Get('google/callback')
  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({summary: 'Google authentication callback'})
  @ApiResponse({status: 200, description: 'User logged in successfully with Google'})
  @ApiResponse({status: 401, description: 'Google authentication failed'})
  async googleAuthCallback(@Req() req: Request & {session: CustomSession, user: any}, @Res() res: Response): Promise<void> {
    await this.authService.googleLogin(req.user, req.session);
    console.log(req.user)
    res.redirect('/auth/me');
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current logged in user' })
  @ApiResponse({ status: 200, description: 'Returns the current user', type: UserDto })
  @ApiResponse({ status: 401, description: 'User is not authenticated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getCurrentUser(@Req() req: Request & { session: CustomSession }): Promise<UserDto> {
    return this.usersService.findUserById(req.session.userId);
  }
}
