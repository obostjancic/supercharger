import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { exec } from 'child_process';
import { writeFileSync } from 'fs';

const pjson = require('root-require')('package.json');

export const generateOpenapi = (app) => {
  const options = new DocumentBuilder()
    .setTitle(pjson.name)
    .setDescription(pjson.description)
    .setVersion(pjson.version)
    .setContact(pjson.author.name, pjson.author.url, pjson.author.email)
    // .addOAuth2(
    //   {
    //     type: "oauth2",
    //     flows: {
    //       implicit: {
    //         scopes: ["email", "openid", "profile"],
    //         authorizationUrl: `https://${process.env.AUTH0_ACCOUNT}.auth0.com/authorize?audience=${process.env.AUTH0_AUDIENCE}`,
    //       },
    //     },
    //   },
    //   "auth0_jwt"
    // )
    .build();

  // openApiOptions.components.securitySchemes["auth0_jwt"] = {
  //   ...openApiOptions.components.securitySchemes.auth0_jwt,
  //   "x-google-issuer": `https://${process.env.AUTH0_ACCOUNT}.auth0.com/`,
  //   "x-google-jwks_uri": `https://${process.env.AUTH0_ACCOUNT}.auth0.com/.well-known/jwks.json`,
  //   "x-google-audiences": process.env.AUTH0_AUDIENCE,
  // };

  // openApiOptions.swaggerOptions = {
  //   oauth2RedirectUrl: `http://${process.env.HOST}:${process.env.PORT}/docs/oauth2-redirect.html`,
  //   oauth: {
  //     clientId: process.env.AUTH0_SWAGGER_CLIENT_ID || "",
  //   },
  // };

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document, {});

  if (process.env.NODE_ENV !== 'dev') {
    writeFileSync(`${process.cwd()}/openapi3.json`, JSON.stringify(document, null, 2));
    exec(
      `openapi-generator generate -i ${process.cwd()}/openapi3.json -g typescript-axios -o ${process.cwd()}/client/api -p useSingleRequestParameter=true`
    );
  }

  return document;
};
