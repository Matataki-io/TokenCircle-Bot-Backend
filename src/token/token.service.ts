import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "src/entities/Token";
import { Repository } from "typeorm";
import { User } from "src/entities/User";

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepo: Repository<Token>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    getTokens() {
        return this.tokenRepo.find();
    }

    get(id: number) {
        return this.tokenRepo.findOne(id, { relations: ["issuer"] });
    }

    getTokenBySymbol(symbol: string) {
        return this.tokenRepo.findOne({ symbol }, { relations: ["issuer"] });
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
}
