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
});
