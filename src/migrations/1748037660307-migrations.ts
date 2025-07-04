import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMenuSectionsToMenuCategories1748035406085
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "menu_categories"`);
    await queryRunner.query(
      `ALTER TABLE "menu_sections" RENAME TO "menu_categories"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_categories" RENAME TO "menu_sections"`,
    );
  }
}
