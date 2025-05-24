import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748111437484 implements MigrationInterface {
  name = "Migrations1748111437484";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "venue_tables" ADD "capacity" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue_tables" ADD "orders" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "venue_tables" ADD "time" text`);
    await queryRunner.query(
      `ALTER TABLE "venue_tables" ALTER COLUMN "table_name" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "venue_tables" ALTER COLUMN "table_name" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "venue_tables" DROP COLUMN "time"`);
    await queryRunner.query(`ALTER TABLE "venue_tables" DROP COLUMN "orders"`);
    await queryRunner.query(
      `ALTER TABLE "venue_tables" DROP COLUMN "capacity"`,
    );
  }
}
