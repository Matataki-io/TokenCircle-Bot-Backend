import {MigrationInterface, QueryRunner} from "typeorm";

export class tryToFitGetAssociatedInfo1583909676828 implements MigrationInterface {
    name = 'tryToFitGetAssociatedInfo1583909676828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { options } = queryRunner.connection;
        if (options.type !== "postgres") {
            throw new Error("Require PostgreSQL database");
        }

        const schema = options.schema ?? "backend-default";
        await queryRunner.query(`ALTER TABLE "${schema}"."user" ADD "name" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "${schema}"."token" ADD "name" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { options } = queryRunner.connection;
        if (options.type !== "postgres") {
            throw new Error("Require PostgreSQL database");
        }

        const schema = options.schema ?? "backend-default";
        await queryRunner.query(`ALTER TABLE "${schema}"."token" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "${schema}"."user" DROP COLUMN "name"`, undefined);
    }

}
