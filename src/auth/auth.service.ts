import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccessBearerToken } from "src/entities/AccessBearerToken";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AccessBearerToken)
        private readonly accessTokenRepo: Repository<AccessBearerToken>
    ) {

    }
    async validateToken(token: string): Promise<boolean> {
        // Checkout the DB to see the token is exist or not.
        const result = await this.accessTokenRepo.findOne({ token });
        return result?.token === token;
    }
}
