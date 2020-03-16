import { Module } from "@nestjs/common";
import { BearerStrategy } from "./bearer.strategy";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessBearerToken } from "src/entities/AccessBearerToken";

@Module({
    imports: [TypeOrmModule.forFeature([AccessBearerToken])],
    providers: [BearerStrategy, AuthService]
})
export class AuthModule { }
