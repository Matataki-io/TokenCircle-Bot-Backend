import {MigrationInterface, QueryRunner} from "typeorm";

export class tryToFitGetAssociatedInfo1583909676828 implements MigrationInterface {
    name = 'tryToFitGetAssociatedInfo1583909676828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "backend_testing"."user" ADD "name" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "backend_testing"."token" ADD "name" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "backend_testing"."token" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "backend_testing"."user" DROP COLUMN "name"`, undefined);
    }

}
