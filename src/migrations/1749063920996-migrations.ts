import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1749063920996 implements MigrationInterface {
    name = 'Migrations1749063920996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "available"`);
        await queryRunner.query(`ALTER TABLE "menus" ADD "is_available" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "category" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "unit" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "unit" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "status" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "status" SET DEFAULT 'good'`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "unit" SET DEFAULT 'unit'`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "unit" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "category" SET DEFAULT 'Uncategorized'`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "category" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "is_available"`);
        await queryRunner.query(`ALTER TABLE "menus" ADD "available" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "menus" ADD "is_active" boolean NOT NULL DEFAULT true`);
    }

}
