import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748098937186 implements MigrationInterface {
  name = "Migrations1748098937186";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Add as nullable
    await queryRunner.query(
      `ALTER TABLE "menu_categories" ADD "venue_id" uuid`,
    );

    // 2. Backfill using the menus table (assuming menu_id is always valid)
    await queryRunner.query(`
            UPDATE "menu_categories" mc
            SET "venue_id" = m."venue_id"
            FROM "menus" m
            WHERE mc."menu_id" = m."id"
        `);

    // 3. Set NOT NULL constraint
    await queryRunner.query(
      `ALTER TABLE "menu_categories" ALTER COLUMN "venue_id" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_categories" DROP COLUMN "venue_id"`,
    );
  }
}
