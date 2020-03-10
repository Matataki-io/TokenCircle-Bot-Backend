import {MigrationInterface, QueryRunner} from "typeorm";

export class rename1583765493579 implements MigrationInterface {
    name = 'rename1583765493579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "backend_testing"."token" ("tokenId" integer NOT NULL, "contractAddress" character varying NOT NULL, CONSTRAINT "PK_9ad8ba4825e74b0dcbdaf0500ee" PRIMARY KEY ("tokenId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "backend_testing"."user" ("userId" integer NOT NULL, "walletAddress" character varying NOT NULL, CONSTRAINT "PK_ac4a4795efe79bf3b30ce29a1c7" PRIMARY KEY ("userId"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "backend_testing"."user"`, undefined);
        await queryRunner.query(`DROP TABLE "backend_testing"."token"`, undefined);
    }

}
