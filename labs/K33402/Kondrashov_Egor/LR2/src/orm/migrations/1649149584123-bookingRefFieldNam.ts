import {MigrationInterface, QueryRunner} from "typeorm";

export class bookingRefFieldNam1649149584123 implements MigrationInterface {
    name = 'bookingRefFieldNam1649149584123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookings"
                RENAME COLUMN "start_at" TO "starts_at"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookings"
                RENAME COLUMN "starts_at" TO "start_at"
        `);
    }

}
