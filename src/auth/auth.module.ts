import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createRedisStore, getSessionConfig } from '../config/redis.config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import session from 'express-session';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule.register({ session: true })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy
  ],
})

export class AuthModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}

  async configure(consumer: MiddlewareConsumer) {
    const redisStore = await createRedisStore(this.configService);
    const sessionConfig = getSessionConfig(this.configService, redisStore);

    consumer.apply(
        session(sessionConfig)
      )
      .forRoutes('*');
  }
}
