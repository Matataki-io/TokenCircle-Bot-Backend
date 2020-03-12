import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/entities/User";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    getUsers() {
        return this.userRepo.find();
    }

    get(id: number) {
        return this.userRepo.findOne(id, { relations: [ "issuedTokens" ]});
    }

    create(id: number, walletAddress: string) {
        return this.userRepo.save(this.userRepo.create({
            id,
            walletAddress,
        }));
    }

    update(id: number, partialEntity: object) {
        return this.userRepo.update(id, partialEntity);
    }

    async delete(id: number) {
        await this.userRepo.delete({ id });
    }

    getUserByTelegramUid(telegramUid: number | string) {
        return this.userRepo.findOne({ telegramUid })
    }

//   getTokenDetailByUser()
}
