import { Connection, createConnection, getConnection } from "typeorm";
import { Token } from "src/entities/Token";
import { User } from "src/entities/User";

let connection: Connection;

beforeEach(async () => {
    connection = await createConnection({
        type: "sqlite",
        database: ":memory:",
        entities: [Token, User],
        synchronize: true,
    });

    const userRepo = getConnection().getRepository(User);
    const user1 = await userRepo.save({
        id: 1,
        name: "User 1",
        walletAddress: "0x1",
        telegramUid: 1,
    });
    const user2 = await userRepo.save({
        id: 2,
        name: "User 2",
        walletAddress: "0x2",
        telegramUid: 2,
    });
    await userRepo.save({
        id: 3,
        name: "User 3",
        walletAddress: "0x3",
    });

    const tokenRepo = connection.getRepository(Token);
    await tokenRepo.insert({
        id: 1,
        name: "Token 1",
        contractAddress: "0x1",
        symbol: "FST",
        issuer: user1,
    });
    await tokenRepo.insert({
        id: 2,
        name: "Token 2",
        contractAddress: "0x2",
        symbol: "SND",
        issuer: user2,
    });
});

afterEach(async () => await connection.close());
