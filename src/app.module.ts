import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/supercharger/auth/auth.module';
import { SuperchargerModule } from 'src/supercharger/supercharger.module';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    AuthModule.register(
      {
        domain: process.env.OAUTH_DOMAIN,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_SECRET,
      },
      process.env.OAUTH_AUDIENCE
    ),
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
    // SentryModule.forRoot({
    //   dsn: process.env.NODE_ENV === 'production' ? process.env.SENTRY_DSN : null,
    //   debug: true,
    // }),
    SuperchargerModule,
    ExampleModule,
  ],
})
export class AppModule {}
