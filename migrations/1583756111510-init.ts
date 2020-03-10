import {MigrationInterface, QueryRunner} from "typeorm";

export class init1583756111510 implements MigrationInterface {
    name = 'init1583756111510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "backend_testing"."access_bearer_tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_251a9bd007a520dede7e09c395d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "backend_testing"."mttk_token_id_to_conract" ("tokenId" integer NOT NULL, "contractAddress" character varying NOT NULL, CONSTRAINT "PK_434733a48b7cc872bed87eaeabb" PRIMARY KEY ("tokenId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "backend_testing"."mttk_uid_to_wallet" ("userId" integer NOT NULL, "walletAddress" character varying NOT NULL, CONSTRAINT "PK_92bf66525c729b3989ad08b3189" PRIMARY KEY ("userId"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "backend_testing"."mttk_uid_to_wallet"`, undefined);
        await queryRunner.query(`DROP TABLE "backend_testing"."mttk_token_id_to_conract"`, undefined);
        await queryRunner.query(`DROP TABLE "backend_testing"."access_bearer_tokens"`, undefined);
    }

}
