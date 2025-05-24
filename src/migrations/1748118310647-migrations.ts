import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748118310647 implements MigrationInterface {
  name = "Migrations1748118310647";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "teams" ADD "email" text`);
    await queryRunner.query(`ALTER TABLE "teams" ADD "status" text`);
    await queryRunner.query(`ALTER TABLE "teams" ADD "image" text`);
    await queryRunner.query(`ALTER TABLE "teams" ADD "lastActive" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "lastActive"`);
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "email"`);
  }
}
