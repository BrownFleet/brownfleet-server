import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPrimaryKeys1749072869303 implements MigrationInterface {
  name = "FixPrimaryKeys1749072869303";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Ensure venues.id is not nullable and has a primary key
    await queryRunner.query(`
      UPDATE "venues" SET id = gen_random_uuid() WHERE id IS NULL;
      ALTER TABLE "venues" ALTER COLUMN "id" SET NOT NULL;
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE table_name = 'venues' AND constraint_type = 'PRIMARY KEY'
        ) THEN
          ALTER TABLE "venues" ADD CONSTRAINT "PK_venues_id" PRIMARY KEY ("id");
        END IF;
      END $$;
    `);

    // Ensure menu_categories.id is not nullable and has a primary key
    await queryRunner.query(`
      UPDATE "menu_categories" SET id = gen_random_uuid() WHERE id IS NULL;
      ALTER TABLE "menu_categories" ALTER COLUMN "id" SET NOT NULL;
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE table_name = 'menu_categories' AND constraint_type = 'PRIMARY KEY'
        ) THEN
          ALTER TABLE "menu_categories" ADD CONSTRAINT "PK_menu_categories_id" PRIMARY KEY ("id");
        END IF;
      END $$;
    `);

    // Ensure menus.venue_id and menus.category_id are uuid type
    await queryRunner.query(`
      ALTER TABLE "menus" ALTER COLUMN "venue_id" TYPE uuid;
      ALTER TABLE "menus" ALTER COLUMN "category_id" TYPE uuid;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Optionally revert type changes (if they were not uuid originally)
    await queryRunner.query(`
      ALTER TABLE "menus" ALTER COLUMN "venue_id" TYPE text;
      ALTER TABLE "menus" ALTER COLUMN "category_id" TYPE text;
    `);
    // Do not drop primary key constraints, as they align with the entity schema
  }
}
