import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { getRepository } from "typeorm";
import { TokenService } from "./token.service";
import { Token } from "src/entities/Token";
import { User } from "src/entities/User";

describe("TokenService", () => {
    let service: TokenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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

        service = module.get<TokenService>(TokenService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should return all tokens", () => {
        const result = service.getTokens();

        expect(result).resolves.toHaveLength(2);
    });

    it("should return token FST by id 1", async () => {
        const result = await service.get(1);

        expect(result).toBeDefined();
        expect(result!.symbol).toBe("FST");
    });
    it("should return undefined by invalid id", () => {
        expect(service.get(-1)).resolves.toBeUndefined();
    });

    it("should return token FST by its symbol", async () => {
        const result = await service.getTokenBySymbol("FST");

        expect(result).toBeDefined();
        expect(result!.id).toBe(1);
    });
    it("should return undefined by invalid symbol", () => {
        expect(service.getTokenBySymbol("NOTFOUND")).resolves.toBeUndefined();
    });

    // it("Create a token", async () => {
    //     expect(service.create(3, "0x3")).resolves.toBeUndefined();

    //     const repo = getRepository(Token);
    //     const token = await repo.findOne(3);
    //     expect(token).toBeDefined();
    //     expect(token!.id).toBe(3);
    //     expect(token!.contractAddress).toBe("0x3");
    // });
    it("Delete a token", async () => {
        expect(service.delete(1)).resolves.toBeUndefined();

        const repo = getRepository(Token);
        expect(repo.findOne(1)).resolves.toBeUndefined();
    });
    it("Update contractAddress", async () => {
        expect(service.update(1, {
            contractAddress: "0xa"
        })).resolves.toBeUndefined();

        const repo = getRepository(Token);
        const token = await repo.findOneOrFail(1);

        expect(token.contractAddress).toBe("0xa");
    });
});
