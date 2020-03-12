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
});
