import { Module } from "@nestjs/common";
import { config } from "dotenv";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { TokenModule } from "./token/token.module";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { GetMappingModule } from './get-mapping/get-mapping.module';

// Load process.env
config();
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "BearerStrategy" }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            // 不同的环境请使用不同的 schema
            schema: process.env.DB_SCHEMA,
            autoLoadEntities: true,
        }),
        UserModule,
        TokenModule,
        AuthModule,
        GetMappingModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
