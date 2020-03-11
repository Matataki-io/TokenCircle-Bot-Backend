import {MigrationInterface, QueryRunner} from "typeorm";

export class linkUserWithToken1583898277906 implements MigrationInterface {
    name = 'linkUserWithToken1583898277906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { options } = queryRunner.connection;
        if (options.type !== "postgres") {
            throw new Error("Require PostgreSQL database");
        }

        const schema = options.schema ?? "backend-default";
        await queryRunner.query(`ALTER TABLE "${schema}"."token" ADD "symbol" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "${schema}"."token" ADD "issuerUserId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "${schema}"."token" ADD CONSTRAINT "FK_e4df57ff1ffe5623f4b82cb5d32" FOREIGN KEY ("issuerUserId") REFERENCES "${schema}"."user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { options } = queryRunner.connection;
        if (options.type !== "postgres") {
            throw new Error("Require PostgreSQL database");
        }

        const schema = options.schema ?? "backend-default";
        await queryRunner.query(`ALTER TABLE "${schema}"."token" DROP CONSTRAINT "FK_e4df57ff1ffe5623f4b82cb5d32"`, undefined);
        await queryRunner.query(`ALTER TABLE "${schema}"."token" DROP COLUMN "issuerUserId"`, undefined);
        await queryRunner.query(`ALTER TABLE "${schema}"."token" DROP COLUMN "symbol"`, undefined);
    }

}
