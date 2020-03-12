import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { getRepository } from "typeorm";
import { UserService } from "./user.service";
import { User } from "src/entities/User";

describe("UserService", () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: getRepository(User),
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should get all 3 users", () => {
        expect(service.getUsers()).resolves.toHaveLength(3);
    });

    it("should get user 1 with his/her issued token", async () => {
        const user = await service.get(1);

        expect(user).toBeDefined();
        expect(user!.name).toBe("User 1");
        expect(user!.issuedTokens).toHaveLength(1);
        expect(user!.issuedTokens[0].id).toBe(1);
        expect(user!.issuedTokens[0].name).toBe("Token 1");
    });

    it("should get user 1 with his/her telegram id", async () => {
        const user = await service.getUserByTelegramUid(1);

        expect(user).toBeDefined();
        expect(user!.name).toBe("User 1");
    });
    it("should get nothing with a telegram id but no matataki account binded", () => {
        expect(service.getUserByTelegramUid(3)).resolves.toBeUndefined();
    });
});
