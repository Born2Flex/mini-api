import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import session from 'express-session';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  constructor(private readonly configService: ConfigService) {
  }

  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: this.configService.get<string>('SESSION_SECRET', 'your-secret-key'),
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: this.configService.get<string>('NODE_ENV') === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          },
        }),
      )
      .forRoutes('*');
  }
}
