import { Module, HttpModule, DynamicModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class AuthModule {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  static register(auth0Config: unknown, audience: unknown): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        ConfigModule.forRoot(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
      providers: [JwtStrategy],
      exports: [PassportModule],
    };
  }
}
