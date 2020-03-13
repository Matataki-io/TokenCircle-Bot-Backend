import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from "@nestjs/typeorm";
import { getRepository } from "typeorm";
import { GetMappingController } from './get-mapping.controller';
import { User } from "src/entities/User";
import { Token } from "src/entities/Token";
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';

describe('GetMapping Controller', () => {
    let controller: GetMappingController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GetMappingController],
            providers: [
                UserService,
                TokenService,
                {
                    provide: getRepositoryToken(User),
                    useValue: getRepository(User),
                },
                {
                    provide: getRepositoryToken(Token),
                    useValue: getRepository(Token),
                },
            ],
        }).compile();

        controller = module.get<GetMappingController>(GetMappingController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    test("Get user 1 by his/her telegram id", async () => {
        const { data } = await controller.getUserByTelegramId(1);

        expect(data).toStrictEqual(Object.assign(new User(), {
            id: 1,
            name: "User 1",
            telegramUid: 1,
            walletAddress: "0x1",
        }));
    });
    test("Get nothing by invalid telegram id", () => {
        expect(controller.getUserByTelegramId(-1)).rejects.toThrowError("No user record for telegram uid: -1");
    });

    test("Get FST token", async () => {
        const { data } = await controller.getTokenBySymbol("FST");

        expect(data).toStrictEqual(Object.assign(new Token(), {
            id: 1,
            name: "Token 1",
            symbol: "FST",
            contractAddress: "0x1",
            issuer: Object.assign(new User(), {
                id: 1,
                name: "User 1",
                telegramUid: 1,
                walletAddress: "0x1",
            }),
        }));
    });
    test("Get nothing by invalid token", () => {
        expect(controller.getTokenBySymbol("INVALID")).rejects.toThrowError("No record for Token symbol: INVALID");
    });

    test("Get FST token by user 1", async () => {
        const { data } = await controller.getTokenByUserId(1);

        expect(data).toStrictEqual([Object.assign(new Token(), {
            id: 1,
            name: "Token 1",
            symbol: "FST",
            contractAddress: "0x1",
        })]);
    });
    test("Get nothing by invalid user id", () => {
        expect(controller.getTokenByUserId(-1)).rejects.toThrowError("No record for Token of the user: -1");
    });
});
