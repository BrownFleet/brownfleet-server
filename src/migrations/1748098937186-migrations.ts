import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748098937186 implements MigrationInterface {
  name = "Migrations1748098937186";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Add as nullable
    await queryRunner.query(
      `ALTER TABLE "menu_categories" ADD "venue_id" uuid`,
    );

    // 2. Backfill using the menus table
    await queryRunner.query(`
      UPDATE "menu_categories" mc
      SET "venue_id" = m."venue_id"
      FROM "menus" m
      WHERE mc."menu_id" = m."id"
    `);

    // 3. Assign a default venue_id to any remaining NULLs
    // Replace 'YOUR_DEFAULT_VENUE_ID' with an actual venue UUID from your venues table
    await queryRunner.query(`
      UPDATE "menu_categories"
      SET "venue_id" = '2f591481-0742-4f7d-93fa-8cafac27a57c'
      WHERE "venue_id" IS NULL
    `);

    // 4. Set NOT NULL constraint
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
