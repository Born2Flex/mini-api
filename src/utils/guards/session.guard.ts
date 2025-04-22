import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { CustomSession } from "./session.interface";

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { session: CustomSession }>();
    const session = request.session;

    if (!session || !session.userId) {
      throw new UnauthorizedException('User is not authenticated');
    }

    return true;
  }
} 
