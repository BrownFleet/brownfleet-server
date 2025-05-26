import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748292630027 implements MigrationInterface {
  name = "Migrations1748292630027";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams" ADD "is_available" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "is_available"`);
  }
}
