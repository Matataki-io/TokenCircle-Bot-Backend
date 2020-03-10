import { Module } from '@nestjs/common';
import { config } from "dotenv";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenController } from './token/token.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AccessBearerTokens } from './entities/AccessBearerTokens';
import { MttkTokenIdToConract } from './entities/MttkTokenIdToConract';
import { MttkUidToWallet } from './entities/MttkUidToWallet';

// Load process.env
config()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'BearerStrategy' }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // 不同的环境请使用不同的 schema
      schema: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      entities: [ AccessBearerTokens, MttkTokenIdToConract, MttkUidToWallet ],
      synchronize: false,
    }),
    UserModule,
    TokenModule,
    AuthModule,
  ],
  controllers: [AppController, TokenController, UserController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
