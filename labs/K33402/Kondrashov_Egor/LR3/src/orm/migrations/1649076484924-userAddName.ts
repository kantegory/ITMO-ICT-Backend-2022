import {MigrationInterface, QueryRunner} from "typeorm";

export class userAddName1649076484924 implements MigrationInterface {
    name = 'userAddName1649076484924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
    }

}
