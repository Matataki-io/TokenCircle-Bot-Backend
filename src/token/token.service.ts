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
  
  async getTokens() {
      const result = await this.tokenRepo.find()
      return result
  }
  
  get(id: number) {
      return this.tokenRepo.findOne(id)
  }

  getTokenBySymbol(symbol: string) {
      return this.tokenRepo.findOne({ symbol }, { relations: ['issuer'] })
  }

  async create(id: number, contractAddress: string) {
      let token = new Token()
      token.tokenId = id;
      token.contractAddress = contractAddress;
      return this.tokenRepo.save(token);
  }

  async update(id: number, contractAddress: string) {
      let token = await this.tokenRepo.findOne(id)
      token.contractAddress = contractAddress;
      return this.tokenRepo.save(token);
  }

  delete(id: number) {
      return this.tokenRepo.delete({ tokenId: id })
  }
}
