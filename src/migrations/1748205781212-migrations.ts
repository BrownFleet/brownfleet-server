import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748205781212 implements MigrationInterface {
  name = "Migrations1748205781212";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE roles SET role_id = 3 WHERE role_id = 0
    `);
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "teams" ADD "name" text`);
    await queryRunner.query(
      `UPDATE "teams" SET "name" = 'Unknown' WHERE "name" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams" ALTER COLUMN "name" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "is_available"`);
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "teams" ADD "status" text`);
  }
}
