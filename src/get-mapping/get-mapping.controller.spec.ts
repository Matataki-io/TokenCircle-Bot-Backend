import { Test, TestingModule } from '@nestjs/testing';
import { GetMappingController } from './get-mapping.controller';

describe('GetMapping Controller', () => {
    let controller: GetMappingController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GetMappingController],
        }).compile();

        controller = module.get<GetMappingController>(GetMappingController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
