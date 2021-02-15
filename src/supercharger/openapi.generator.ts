import { DocumentBuilder } from "@nestjs/swagger";

const pjson = require("root-require")("package.json");

export const generateOpenapiOptions = () => {
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

  const openApiOptions: any = {
    ...options,
  };

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

  return openApiOptions;
};
