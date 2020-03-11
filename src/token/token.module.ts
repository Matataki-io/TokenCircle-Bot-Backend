import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { TokenController } from "./token.controller";
import { Token } from "src/entities/Token";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Token])],
    controllers: [TokenController],
    providers: [TokenService]
})
export class TokenModule {}
