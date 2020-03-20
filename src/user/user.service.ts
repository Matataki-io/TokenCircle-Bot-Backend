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

    async getUsers() {
        return (await this.userRepo.find()).map(this.process);
    }

    async get(id: number) {
        return this.process(await this.userRepo.findOne(id, { relations: [ "issuedTokens" ]}));
    }

    async create(id: number, name: string, walletAddress: string) {
        await this.userRepo.save(this.userRepo.create({
            id,
            name,
            walletAddress,
        }));
    }

    update(id: number, partialEntity: object) {
        return this.userRepo.update(id, partialEntity);
    }

    async delete(id: number) {
        await this.userRepo.delete({ id });
    }

    async getUserByTelegramUid(telegramUid: number | string) {
        return this.process(await this.userRepo.findOne({ telegramUid }, { relations: [ "issuedTokens" ]}));
    }

    private process(user?: User) {
        if (user && typeof user.telegramUid === "string") {
            user.telegramUid = Number(user.telegramUid);
        }

        return user;
    }

//   getTokenDetailByUser()
}
