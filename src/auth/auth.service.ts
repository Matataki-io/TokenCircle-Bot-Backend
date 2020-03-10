import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccessBearerTokens } from "src/entities/AccessBearerTokens";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AccessBearerTokens)
        private readonly accessTokenRepo: Repository<AccessBearerTokens>
    ) {

    }
    async validateToken(token: string): Promise<boolean> {
        // Checkout the DB to see the token is exist or not.
        const result = await this.accessTokenRepo.find({ token });
        return result.length !== 0 && result[0].token === token;
    }
}
