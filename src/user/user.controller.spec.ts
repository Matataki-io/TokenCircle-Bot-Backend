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

    test("Get all 3 users", async () => {
        const { data } = await controller.getUsers();

        expect(data).toHaveLength(3);
    });

    test("Get user 1 with his/her issued token", async () => {
        const { data } = await controller.getUser(1);

        expect(data).toBeDefined();
        expect(data.name).toBe("User 1");
        expect(data.issuedTokens).toHaveLength(1);
        expect(data.issuedTokens[0].id).toBe(1);
        expect(data.issuedTokens[0].name).toBe("Token 1");
    });

    test("Get nothing with invalid id", () => {
        expect(controller.getUser(-1)).rejects.toThrowError("User -1 is not found from the database");
    });

    test("Create User 4", async () => {
        const statusFunc = jest.fn();

        await controller.addUser(4, {
            name: "User 4",
            walletAddress: "0x4",
        }, { status: statusFunc } as any);

        expect(statusFunc).toBeCalledWith(201);

        const repo = getRepository(User);
        const token = await repo.findOne(4);

        expect(token).toBeDefined();
        expect(token!.id).toBe(4);
        expect(token!.name).toBe("User 4");
        expect(token!.walletAddress).toBe("0x4");
    });
    test("Replace User 3", async () => {
        const statusFunc = jest.fn();

        await controller.addUser(3, {
            name: "User 3",
            walletAddress: "0xc",
        }, { status: statusFunc } as any);

        expect(statusFunc).toBeCalledWith(200);

        const repo = getRepository(User);
        const token = await repo.findOne(3);

        expect(token).toBeDefined();
        expect(token!.id).toBe(3);
        expect(token!.name).toBe("User 3");
        expect(token!.walletAddress).toBe("0xc");
    });

    test("Delete user 3", async () => {
        await controller.deleteUserRecord(3);

        const repo = getRepository(User);

        expect(repo.findOne(3)).resolves.toBeUndefined();
    });
});
