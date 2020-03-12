import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { getRepository } from "typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "src/entities/User";

describe("User Controller", () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: getRepository(User),
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should get all 3 users", async () => {
        const result = await controller.getUsers();

        expect(result.users).toHaveLength(3);
    });

    it("should get user 1 with his/her issued token", async () => {
        const { user } = await controller.getUser("1");

        expect(user).toBeDefined();
        expect(user.name).toBe("User 1");
        expect(user.issuedTokens).toHaveLength(1);
        expect(user.issuedTokens[0].id).toBe(1);
        expect(user.issuedTokens[0].name).toBe("Token 1");
    });
});
