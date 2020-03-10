import {MigrationInterface, QueryRunner} from "typeorm";

export class userNewTelegramField1583838412510 implements MigrationInterface {
    name = 'userNewTelegramField1583838412510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "backend_testing"."user" ADD "telegramUid" bigint`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "backend_testing"."user" DROP COLUMN "telegramUid"`, undefined);
    }

}
