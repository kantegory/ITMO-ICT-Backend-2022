import {MigrationInterface, QueryRunner} from "typeorm";

export class hotelCreate1649077467136 implements MigrationInterface {
    name = 'hotelCreate1649077467136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "hotels" (
                "id" SERIAL NOT NULL,
                "name" character varying(511) NOT NULL,
                "address" character varying(1023) NOT NULL,
                "img_url" character varying(2047) NOT NULL,
                "description" text NOT NULL,
                "rating" double precision,
                "cost_from" double precision,
                CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_30d048e1a4d30b057739a0ef69" ON "hotels" ("name")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_30d048e1a4d30b057739a0ef69"
        `);
        await queryRunner.query(`
            DROP TABLE "hotels"
        `);
    }

}
