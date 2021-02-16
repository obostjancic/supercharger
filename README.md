## Description

Api starter, built on nest.js and nest-crud packages

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
