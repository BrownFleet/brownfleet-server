import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748039626399 implements MigrationInterface {
  name = "Migrations1748039626399";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migration already applied manually or by another process.
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op
  }
}
