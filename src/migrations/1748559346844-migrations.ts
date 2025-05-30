import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748559346844 implements MigrationInterface {
    name = 'Migrations1748559346844'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "inventory" ADD "venue_id" uuid`);

        await queryRunner.query(`
            UPDATE "inventory"
            SET "venue_id" = '012eeaab-5160-4e61-93af-41fdb59250f2'
        `);

        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "venue_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "venue_id"`);
    }
}
