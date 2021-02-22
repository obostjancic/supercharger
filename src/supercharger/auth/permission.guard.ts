import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BaseEntity } from 'typeorm';

@Injectable()
export class PermissionGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(_: Error, userInfo: unknown, __: unknown, context: ExecutionContext): any {
    const resource = this.reflector.get<typeof BaseEntity>('resource', context.getClass());
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const { params, query, body, method, path } = context.switchToHttp().getRequest();

    console.log(resource, permissions, params, query, body, method, path);

    if (!userInfo) throw new UnauthorizedException('Unauthenticated');
    return userInfo;
  }
}
