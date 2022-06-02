import {MigrationInterface, QueryRunner} from "typeorm";

export class bookingCreate1649081572956 implements MigrationInterface {
    name = 'bookingCreate1649081572956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookings" (
                "id" SERIAL NOT NULL,
                "start_at" date NOT NULL,
                "ends_at" date NOT NULL,
                "number_of_guests" smallint NOT NULL,
                "user_id" integer,
                "hotel_id" integer,
                CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "bookings"
            ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "bookings"
            ADD CONSTRAINT "FK_a71eec827a2ac2285d6266d7120" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookings" DROP CONSTRAINT "FK_a71eec827a2ac2285d6266d7120"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"
        `);
        await queryRunner.query(`
            DROP TABLE "bookings"
        `);
    }

}
