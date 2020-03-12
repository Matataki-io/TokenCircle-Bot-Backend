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

    async create(id: number, username: string, walletAddress: string) {
        let user = new User()
        user.userId = id;
        user.name = username;
        user.walletAddress = walletAddress;
        return this.userRepo.save(user);
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
