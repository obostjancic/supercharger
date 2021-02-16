import { Injectable, applyDecorators, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { Bar } from 'src/example/bar.entity';

@Injectable()
export class PermissionGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  //@ts-ignore
  async handleRequest(err, userInfo, info, context) {
    const resource = this.reflector.get<any>('resource', context.getClass());
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const { params, query, body, method, path } = context.getRequest();

    // throw new UnauthorizedException('Nope');
    return false;
  }
}
