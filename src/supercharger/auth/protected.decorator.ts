import { applyDecorators, SetMetadata, UseGuards, CustomDecorator } from '@nestjs/common';
import { ApiOAuth2 } from '@nestjs/swagger';
import { PermissionGuard } from './permission.guard';

export const Permissions = (...permissions: string[]): CustomDecorator =>
  SetMetadata('permissions', permissions);

export const Protected = (...permissions: string[]): any =>
  applyDecorators(
    UseGuards(PermissionGuard),
    ApiOAuth2([], 'auth0_jwt'),
    Permissions(...permissions)
  );
