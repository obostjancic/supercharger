import { applyDecorators, Controller as NestController, Param, SetMetadata } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { Protected } from "./auth/protected.decorator";

const protect = (should: boolean) => (should ? Protected() : () => {});

export const Controller = (resource, auth: boolean = true) => {
  const singular = resource.name.toString();
  const plural = `${singular}s`;
  return applyDecorators(
    NestController(`api/${plural.toLowerCase()}`),
    SetMetadata("resource", resource),
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
    }),
    ApiTags(resource.name)
    // UseFilters(new AllExceptionsFilter())
  );
};
export const Id = () => Param("id");
