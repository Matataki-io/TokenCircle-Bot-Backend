import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "src/entities/Token";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepo: Repository<Token>
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

    async create(id: number, contractAddress: string) {
        await this.tokenRepo.save(this.tokenRepo.create({
            id,
            contractAddress,
        }));
    }

    async update(id: number, contractAddress: string) {
        await this.tokenRepo.update(id, { contractAddress });
    }

    async delete(id: number) {
        await this.tokenRepo.delete(id);
    }
}
