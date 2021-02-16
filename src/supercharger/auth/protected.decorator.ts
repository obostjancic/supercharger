import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiBody } from '@nestjs/swagger';
import { PermissionGuard } from './permission.guard';
import { Bar } from 'src/example/bar.entity';

export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions);

export const Protected = (...permissions: string[]) =>
  applyDecorators(
    UseGuards(PermissionGuard),
    ApiOAuth2([], 'auth0_jwt'),
    Permissions(...permissions)
  );
