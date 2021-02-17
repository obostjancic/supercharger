import { applyDecorators, Controller as NestController, Param, SetMetadata } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Protected } from './auth/protected.decorator';

const protect = (should: boolean) => (should ? Protected() : () => {});

export const Controller = (resource, auth: boolean = true) => {
  const singular = resource.name.toString();
  const plural = `${singular}s`;

  return applyDecorators(
    NestController(`api/${plural.toLowerCase()}`),
    SetMetadata('resource', resource),
    Crud({
      model: {
        type: resource,
      },
      routes: {
        getManyBase: {
          decorators: [protect(auth), ApiOperation({ operationId: `get${plural}` })],
        },
        getOneBase: {
          decorators: [protect(auth), ApiOperation({ operationId: `get${singular}` })],
        },
        createOneBase: {
          decorators: [protect(auth), ApiOperation({ operationId: `create${singular}` })],
        },
        createManyBase: {
          decorators: [protect(auth), ApiOperation({ operationId: `create${plural}` })],
        },
        updateOneBase: {
          decorators: [protect(auth), ApiOperation({ operationId: `update${singular}` })],
        },
        replaceOneBase: {
          decorators: [protect(auth), ApiOperation({ operationId: `replace${singular}` })],
        },
        deleteOneBase: {
          decorators: [protect(auth), ApiOperation({ operationId: `remove${singular}` })],
        },
      },
      query: {
        alwaysPaginate: true,
        limit: 50,
        maxLimit: 100,
      },
    }),
    ApiTags(resource.name)
  );
};
export const Id = () => Param('id');
