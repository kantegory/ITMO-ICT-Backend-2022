import {MigrationInterface, QueryRunner} from "typeorm";

export class userNameNullable1649090139948 implements MigrationInterface {
    name = 'userNameNullable1649090139948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "name" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
    }

}
