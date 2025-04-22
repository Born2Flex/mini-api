import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import session from 'express-session';
import { createRedisStore, getSessionConfig } from '../config/redis.config';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  constructor(private readonly configService: ConfigService) {
  }

  async configure(consumer: MiddlewareConsumer) {
    const redisStore = await createRedisStore(this.configService);
    const sessionConfig = getSessionConfig(this.configService, redisStore);

    consumer.apply(
        session(sessionConfig)
      )
      .forRoutes('*');
  }
}
