import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "src/entities/Token";
import { Repository } from "typeorm";
import { User } from "src/entities/User";
import { maskEmailAddress } from "src/util";

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepo: Repository<Token>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    async getTokens() {
        return (await this.tokenRepo.find()).map(this.process);
    }

    async get(id: number) {
        return this.process(await this.tokenRepo.findOne(id, { relations: ["issuer"] }));
    }

    async getTokenBySymbol(symbol: string) {
        return this.process(await this.tokenRepo.findOne({ symbol }, { relations: ["issuer"] }));
    }

    async create(id: number, name: string, symbol: string, issuerUid: number, contractAddress: string) {
        await this.tokenRepo.save(this.tokenRepo.create({
            id,
            name,
            symbol,
            contractAddress,
            issuer: await this.userRepo.findOne(issuerUid),
        }));
    }

    async update(id: number, payload: object) {
        await this.tokenRepo.update(id, payload);
    }

    async delete(id: number) {
        await this.tokenRepo.delete(id);
    }

    private process(token?: Token) {
        if (token && token.issuer) {
            if (token.issuer.name && token.issuer.name.includes("@")) {
                token.issuer.name = maskEmailAddress(token.issuer.name);
            }

            if (token.issuer && typeof token.issuer.telegramUid === "string") {
                token.issuer.telegramUid = Number(token.issuer.telegramUid);
            }
        }

        return token;
    }
}
