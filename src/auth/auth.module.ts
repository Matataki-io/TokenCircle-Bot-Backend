import { Module } from "@nestjs/common";
import { BearerStrategy } from "./bearer.strategy";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessBearerTokens } from "src/entities/AccessBearerTokens";

@Module({
    imports: [TypeOrmModule.forFeature([AccessBearerTokens])],
    providers: [BearerStrategy, AuthService]
})
export class AuthModule { }
