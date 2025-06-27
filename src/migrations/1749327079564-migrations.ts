import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1749327079564 implements MigrationInterface {
  name = "Migrations1749327079564";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Drop constraints to allow cleanup
    await queryRunner.query(
      `ALTER TABLE "menus" DROP CONSTRAINT IF EXISTS "FK_83b2cc4e4e8467ea40e5cf860f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_categories" DROP CONSTRAINT IF EXISTS "FK_0da59e0a8c0bf70a3a7f532c9e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_categories" DROP CONSTRAINT IF EXISTS "FK_fa0fa69dd378d4a0f6dec1497b5"`,
    );

    // 2. Clean up orphaned menu_id references
    await queryRunner.query(`
            DELETE FROM "menu_categories"
            WHERE "menu_id" IS NOT NULL
              AND "menu_id" NOT IN (SELECT id FROM "menus")
        `);

    // 3. Clean up orphaned venue_id references
    await queryRunner.query(`
            DELETE FROM "menu_categories"
            WHERE "venue_id" IS NOT NULL
              AND "venue_id" NOT IN (SELECT id FROM "venues")
        `);

    // 4. Clean up orphaned category_id references in menus
    await queryRunner.query(`
            DELETE FROM "menus"
            WHERE "category_id" IS NOT NULL
              AND "category_id" NOT IN (SELECT id FROM "menu_categories")
        `);

    // 5. Re-add constraints
    await queryRunner.query(
      `ALTER TABLE "menu_categories" ADD CONSTRAINT "FK_0da59e0a8c0bf70a3a7f532c9e0" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_categories" ADD CONSTRAINT "FK_fa0fa69dd378d4a0f6dec1497b5" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menus" ADD CONSTRAINT "FK_83b2cc4e4e8467ea40e5cf860f3" FOREIGN KEY ("category_id") REFERENCES "menu_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menus" DROP CONSTRAINT IF EXISTS "FK_83b2cc4e4e8467ea40e5cf860f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_categories" DROP CONSTRAINT IF EXISTS "FK_0da59e0a8c0bf70a3a7f532c9e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_categories" DROP CONSTRAINT IF EXISTS "FK_fa0fa69dd378d4a0f6dec1497b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_categories" ADD "display_order" integer NOT NULL`,
    );
  }
}
