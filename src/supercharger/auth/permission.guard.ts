import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';

@Injectable()
export class PermissionGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, userInfo, info, context): any {
    const resource = this.reflector.get<any>('resource', context.getClass());
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const { params, query, body, method, path } = context.getRequest();

    if (!userInfo) throw new UnauthorizedException('Unauthenticated');
    return userInfo;
  }
}
