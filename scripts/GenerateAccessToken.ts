import { getConnectionOptions, createConnection } from "typeorm";
import { randomBytes } from "crypto";

async function generateAccessToken() {
    const options = await getConnectionOptions()
    if (options.type !== "postgres") {
        console.error("Require PostgreSQL database");
        return;
    }
    const token = randomBytes(48).toString('hex')
    const sqlCommand = `insert into "${options.schema}".access_bearer_token(token) VALUES('${token}')`;
    const conn = await createConnection();

    const queryRunner = conn.createQueryRunner();
    await queryRunner.query(sqlCommand, undefined);

    console.info(`Your new access token is: ${token}`)
    await conn.close()
    process.exit();

}

generateAccessToken()
