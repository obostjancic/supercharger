## Description

Api starter, built on top of <a href="https://nestjs.com/">nest</a> and <a href="https://github.com/nestjsx/crud">nextjsx-crud</a> packages. Enables rapid REST API development and automates openapi docs and client generation.

## Creating layered CRUD

First define an entity in the following way (it will inherit id and created updated columns from BaseEntity class):

```ts
@Entity('foos')
export class Foo extends BaseEntity {
  @Column({ name: 'temp', type: 'int' })
  @ApiProperty({ name: 'temp', type: 'number' })
  temp: number;
}
```

Then define a service for this entity

```ts
@Injectable()
export class FooService extends TypeOrmCrudService<Foo> {
  constructor(@InjectRepository(Foo) repo) {
    super(repo);
  }
}
```

And a Controller

```ts
@Controller(Foo)
export class FooController implements CrudController<Foo> {
  constructor(public service: FooService) {}
}
```

And that is it! This will create a CRUD controller that allows basic manipulation with this entity. On top of that it will generate openapi(swagger) docs and a axios-typescript library that can be used in the following way

```ts
import { FooApi } from '../client/api';

const fooApi = new FooApi();

const foo = await fooApi.getFoo();
const foos = await fooApi.getFoos();
const newFoo = await fooApi.createFoo();
const newFoos = await fooApi.createFoos();
const updatedFoo = await fooApi.updateFoo();
const replaceFoo = await fooApi.replaceFoo();
const noFoo = await fooApi.removeFoo();
```

## Installation

```bash
$ yarn
```

## Running the app

Rename _.env.example_ to _.env_

```bash
# development
$ yarn start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Database

```bash
docker-compose up
# to create a superuser for omnidb
docker exec -it my_container python omnidb-server.py --createsuperuser=admin pass
```

## OmniDB

```bash
Navigate to 0.0.0.0:8081 (localhost dosn't work)
Login with admin/pass superuser
When adding a connection bear in mind that omniDB is running in docker so
postgres is not at localhost:5432 but postgres:5432
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
