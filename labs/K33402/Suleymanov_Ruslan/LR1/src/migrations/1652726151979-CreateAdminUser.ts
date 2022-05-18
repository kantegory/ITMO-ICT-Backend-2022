import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../models/User";
import {AppDataSource} from "../dataSource/data-source";

export class CreateAdminUser1652726151979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const userRepository = AppDataSource.getRepository(User);

        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.hashPassword();
        user.role = "ADMIN";

        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
