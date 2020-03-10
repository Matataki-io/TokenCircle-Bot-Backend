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
      const result = await this.userRepo.find()
      return result
  }

  get(id: number) {
      return this.userRepo.findOne(id)
  }
  
  async create(id: number, walletAddress: string) {
      let user = new User()
      user.userId = id;
      user.walletAddress = walletAddress;
      return this.userRepo.save(user);
  }

  update(id: number, partialEntity: object) {
      return this.userRepo.update(id, partialEntity);
  }

  delete(id: number) {
      return this.userRepo.delete({ userId: id })
  }
}
