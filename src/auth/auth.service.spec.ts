import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { FindConditions } from "typeorm";
import { AuthService } from "./auth.service";
import { AccessBearerToken } from "src/entities/AccessBearerToken";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(AccessBearerToken),
                    useValue: {
                        findOne({ token }: FindConditions<AccessBearerToken>) {
                            if (token !== "validToken") {
                                return undefined;
                            }

                            const result = new AccessBearerToken();
                            result.token = token;

                            return Promise.resolve(result);
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should be true on valid accesstoken", () => {
        expect(service.validateToken("validToken")).resolves.toBe(true);
    });
    it("should be false on invalid accesstoken", () => {
        expect(service.validateToken("invalidToken")).resolves.toBe(false);
    });
});
