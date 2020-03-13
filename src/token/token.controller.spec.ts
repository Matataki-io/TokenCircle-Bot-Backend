import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { getRepository } from "typeorm";
import { Token } from "src/entities/Token";
import { User } from "src/entities/User";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";

describe("Token Controller", () => {
    let controller: TokenController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TokenController],
            providers: [
                TokenService,
                {
                    provide: getRepositoryToken(Token),
                    useValue: getRepository(Token),
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: getRepository(User),
                },
            ],
        }).compile();

        controller = module.get<TokenController>(TokenController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    test("Get all tokens", async () => {
        const { data } = await controller.getAllTokens();

        expect(data).toHaveLength(2);
    });
    test("Get token 1", async () => {
        const { data } = await controller.getToken(1);

        expect(data.id).toBe(1);
        expect(data.name).toBe("Token 1");
        expect(data.symbol).toBe("FST");
        expect(data.contractAddress).toBe("0x1");
        expect(data.issuer).toBeDefined();
        expect(data.issuer.id).toBe(1);
        expect(data.issuer.name).toBe("User 1");
    });

    test("Get nothing with invalid id", () => {
        expect(controller.getToken(-1)).rejects.toThrowError("Token -1 is not found from the database");
    });

    test("Create Token 3", async () => {
        const statusFunc = jest.fn();

        await controller.addToken(3, {
            name: "Token 3",
            symbol: "TRD",
            issuer: 3,
            contractAddress: "0x3",
        }, { status: statusFunc } as any);

        expect(statusFunc).toBeCalledWith(201);

        const repo = getRepository(Token);
        const token = await repo.findOne(3, { relations: ["issuer"] });

        expect(token).toBeDefined();
        expect(token!.id).toBe(3);
        expect(token!.name).toBe("Token 3");
        expect(token!.symbol).toBe("TRD");
        expect(token!.contractAddress).toBe("0x3");
        expect(token!.issuer).toBeDefined();
        expect(token!.issuer.id).toBe(3);
        expect(token!.issuer.name).toBe("User 3");
    });
    test("Replace Token 1", async () => {
        const statusFunc = jest.fn();

        await controller.addToken(1, {
            name: "Token 1",
            symbol: "FST",
            issuer: 1,
            contractAddress: "0xa",
        }, { status: statusFunc } as any);

        expect(statusFunc).toBeCalledWith(200);

        const repo = getRepository(Token);
        const token = await repo.findOne(1, { relations: ["issuer"] });

        expect(token).toBeDefined();
        expect(token!.id).toBe(1);
        expect(token!.name).toBe("Token 1");
        expect(token!.symbol).toBe("FST");
        expect(token!.contractAddress).toBe("0xa");
        expect(token!.issuer).toBeDefined();
        expect(token!.issuer.id).toBe(1);
        expect(token!.issuer.name).toBe("User 1");
    });

    test("Delete token 1", async () => {
        await controller.deleteTokenRecord(1);

        const repo = getRepository(Token);
        const token = await repo.findOne(1, { relations: ["issuer"] });

        expect(token).toBeUndefined();
    });
});
