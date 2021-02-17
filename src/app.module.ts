import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { AuthModule } from 'src/supercharger/auth/auth.module';
import { SuperchargerModule } from 'src/supercharger/supercharger.module';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    AuthModule.register(
      {
        domain: `${process.env.AUTH0_ACCOUNT}.auth0.com`,
        clientId: process.env.AUTH0_API_EXPLORER_CLIENT_ID,
        clientSecret: process.env.AUTH0_API_EXPLORER_SECRET,
      },
      process.env.AUTH0_AUDIENCE
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
      cache: true,
    }),
    SentryModule.forRoot({
      dsn:
        process.env.NODE_ENV === 'production'
          ? 'https://3f67c3add7994d9a9833d4d801bc0f87@o405677.ingest.sentry.io/5418961'
          : null,
      debug: true,
    }),
    SuperchargerModule,
    ExampleModule,
  ],
})
export class AppModule {}
