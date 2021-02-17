import { RolesBuilder } from 'nest-access-control';

export enum Roles {
  User = 'user',
  Admin = 'admin',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(Roles.User)
  .createOwn('foo')
  .deleteOwn('foo')
  .readAny('foo')
  .grant(Roles.Admin)
  .extend(Roles.User)
  .updateAny('foo')
  .deleteAny('foo');
