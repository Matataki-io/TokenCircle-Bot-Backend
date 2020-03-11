import {MigrationInterface, QueryRunner} from "typeorm";

export class linkUserWithToken1583898277906 implements MigrationInterface {
    name = 'linkUserWithToken1583898277906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "backend_testing"."token" ADD "symbol" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "backend_testing"."token" ADD "issuerUserId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "backend_testing"."token" ADD CONSTRAINT "FK_e4df57ff1ffe5623f4b82cb5d32" FOREIGN KEY ("issuerUserId") REFERENCES "backend_testing"."user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "backend_testing"."token" DROP CONSTRAINT "FK_e4df57ff1ffe5623f4b82cb5d32"`, undefined);
        await queryRunner.query(`ALTER TABLE "backend_testing"."token" DROP COLUMN "issuerUserId"`, undefined);
        await queryRunner.query(`ALTER TABLE "backend_testing"."token" DROP COLUMN "symbol"`, undefined);
    }

}
