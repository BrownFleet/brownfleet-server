import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1749072869303 implements MigrationInterface {
  name = "Migrations1749072869303";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "menus" ALTER COLUMN "venue_id" DROP NOT NULL;
    `);
    await queryRunner.query(`
      ALTER TABLE "menus" ALTER COLUMN "category_id" DROP NOT NULL;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'FK_9a0e6a787106a3b327b00503fb9'
        ) THEN
          ALTER TABLE "menus"
          ADD CONSTRAINT "FK_9a0e6a787106a3b327b00503fb9"
          FOREIGN KEY ("venue_id") REFERENCES "venues"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'FK_83b2cc4e4e8467ea40e5cf860f3'
        ) THEN
          ALTER TABLE "menus"
          ADD CONSTRAINT "FK_83b2cc4e4e8467ea40e5cf860f3"
          FOREIGN KEY ("category_id") REFERENCES "menu_categories"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "menus" DROP CONSTRAINT IF EXISTS "FK_83b2cc4e4e8467ea40e5cf860f3";
    `);
    await queryRunner.query(`
      ALTER TABLE "menus" DROP CONSTRAINT IF EXISTS "FK_9a0e6a787106a3b327b00503fb9";
    `);
    await queryRunner.query(`
      ALTER TABLE "menus" ALTER COLUMN "category_id" SET NOT NULL;
    `);
    await queryRunner.query(`
      ALTER TABLE "menus" ALTER COLUMN "venue_id" SET NOT NULL;
    `);
  }
}
