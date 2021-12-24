import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import { INestApplication } from '@nestjs/common';

/* eslint-disable @typescript-eslint/no-var-requires */
const pjson = require('root-require')('package.json');

export const generateOpenapi = (app: INestApplication): OpenAPIObject => {
  const options = new DocumentBuilder()
    .setTitle(pjson.name)
    .setDescription(pjson.description)
    .setVersion(pjson.version)
    .setContact(pjson.author.name, pjson.author.url, pjson.author.email)
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          implicit: {
            scopes: ['email', 'openid', 'profile'],
            authorizationUrl: process.env.OAUTH_AUTH_URL,
          },
        },
      },
      'auth0_jwt'
    )
    .build();

  const opts: OpenAPIObject = {
    paths: {},
    ...options,
    components: {
      securitySchemes: {
        ['auth0_jwt']: {
          //@ts-ignore
          ...options.components.securitySchemes.auth0_jwt,
          'x-google-issuer': process.env.OAUTH_ISSUER,
          'x-google-jwks_uri': process.env.OAUTH_JWKS_URL,
          'x-google-audiences': process.env.OAUTH_AUDIENCE,
        },
      },
    },
  };
  const document = SwaggerModule.createDocument(app, opts);

  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      oauth2RedirectUrl: process.env.OAUTH_REDIRECT_URL,
      oauth: {
        clientId: process.env.OAUTH_CLIENT_ID || '',
      },
    },
  });

  if (process.env.NODE_ENV !== 'dev') {
    writeFileSync(`${process.cwd()}/openapi3.json`, JSON.stringify(document, null, 2));
    exec(
      `openapi-generator generate -i ${process.cwd()}/openapi3.json -g typescript-axios -o ${process.cwd()}/../wings/client/api -p useSingleRequestParameter=true`
    );
  }

  return document;
};
