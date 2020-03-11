import {MigrationInterface, QueryRunner} from "typeorm";

export class userNewTelegramField1583838412510 implements MigrationInterface {
    name = 'userNewTelegramField1583838412510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { options } = queryRunner.connection;
        if (options.type !== "postgres") {
            throw new Error("Require PostgreSQL database");
        }

        const schema = options.schema ?? "backend-default";
        await queryRunner.query(`ALTER TABLE "${schema}"."user" ADD "telegramUid" bigint`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { options } = queryRunner.connection;
        if (options.type !== "postgres") {
            throw new Error("Require PostgreSQL database");
        }

        const schema = options.schema ?? "backend-default";
        await queryRunner.query(`ALTER TABLE "${schema}"."user" DROP COLUMN "telegramUid"`, undefined);
    }

}
