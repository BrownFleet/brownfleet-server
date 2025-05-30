import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748632049025 implements MigrationInterface {
  name = "Migrations1748632049025";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Schema changes
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "last_used"`);
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD "venue_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD "category" text NOT NULL DEFAULT 'Uncategorized'`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD "unit" text NOT NULL DEFAULT 'unit'`,
    );
    await queryRunner.query(`ALTER TABLE "inventory" ADD "supplier" text`);
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD "status" text NOT NULL DEFAULT 'good'`,
    );

    // Insert all rows you provided
    await queryRunner.query(`
            INSERT INTO "inventory" (
                id, venue_id, name, description, category, unit, supplier, status,
                quantity, threshold_value, unit_price, last_received, expiration_date,
                notes, is_active, created_at, updated_at
            ) VALUES
            ('c855a510-df95-4857-96bc-0b4a1f74961b', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Basil', 'Fresh basil leaves', 'Herbs', 'bunches', 'Herb Garden Farms', 'low', 5, 10, '1.99', '2025-05-26', '2025-06-02', '', true, NOW(), NOW()),
            ('5c33df97-dd0d-4cf7-9d32-e14ee2384659', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Beef Sirloin', 'Premium beef sirloin', 'Meat', 'kg', 'Premium Meats Inc.', 'low', 6, 10, '18.99', '2025-05-24', '2025-06-07', '', true, NOW(), NOW()),
            ('ecb699f0-d02d-4490-b28d-5f31a5b952f2', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Chicken Breast', 'Boneless chicken breast', 'Meat', 'kg', 'Premium Poultry Co.', 'low', 8, 15, '12.99', '2025-05-22', '2025-06-05', '', true, NOW(), NOW()),
            ('e847226e-b9c9-42fd-b1ac-fbd42064e6aa', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Flour', 'All-purpose flour', 'Dry Goods', 'kg', 'Baker''s Supply Inc.', 'low', 15, 20, '2.49', '2025-05-15', '2025-11-15', '', true, NOW(), NOW()),
            ('a3031bae-0b81-4269-a8f9-f3b5baa0ad38', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Garlic', 'Fresh garlic heads', 'Vegetables', 'heads', 'Fresh Farms Suppliers', 'low', 12, 15, '0.99', '2025-05-20', '2025-07-20', '', true, NOW(), NOW()),
            ('b78ac1ed-c843-4a6d-acf8-8f778f0b7118', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Heavy Cream', 'Rich heavy cream', 'Dairy', 'liters', 'Dairy Delights', 'low', 4, 8, '4.99', '2025-05-21', '2025-06-10', '', true, NOW(), NOW()),
            ('fdfa221c-90cc-47da-b34f-3677e620325c', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Mozzarella Cheese', 'Shredded mozzarella cheese', 'Dairy', 'kg', 'Dairy Delights', 'good', 10, 5, '9.99', '2025-05-23', '2025-06-15', '', true, NOW(), NOW()),
            ('3e0ea5da-7492-4212-acbc-549be66ae5f6', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Olive Oil', 'Extra virgin olive oil', 'Oils', 'bottles', 'Mediterranean Imports', 'critical', 3, 8, '8.99', '2025-05-10', '2025-12-10', '', true, NOW(), NOW()),
            ('bf39b616-377d-44b4-9020-aa34e4f4b577', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Pasta', 'Italian pasta', 'Dry Goods', 'kg', 'Italian Imports Co.', 'good', 20, 10, '2.99', '2025-05-18', '2025-11-18', '', true, NOW(), NOW()),
            ('685e4840-2f5b-4a6f-86b9-129c8fa8b575', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Potatoes', 'Fresh potatoes', 'Vegetables', 'kg', 'Fresh Farms Suppliers', 'good', 30, 15, '1.99', '2025-05-19', '2025-07-19', '', true, NOW(), NOW()),
            ('467d5c5a-401f-4510-94b6-3c36f45e0bfa', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Red Wine', 'House red wine', 'Beverages', 'bottles', 'Vineyard Selections', 'critical', 2, 6, '15.99', '2025-05-05', '2026-05-05', '', true, NOW(), NOW()),
            ('b04767dc-8bf9-41f2-bcc7-7d3172ada334', '012eeaab-5160-4e61-93af-41fdb59250f2', 'Tomato Sauce', 'Fresh tomato sauce for pizzas and pastas', 'Sauces', 'liters', 'Fresh Farms Suppliers', 'good', 25, 10, '2.5', '2025-05-25', '2025-07-01', 'Keep refrigerated', true, NOW(), NOW())
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete all inserted rows by id
    await queryRunner.query(`
            DELETE FROM "inventory" WHERE id IN (
                'c855a510-df95-4857-96bc-0b4a1f74961b',
                '5c33df97-dd0d-4cf7-9d32-e14ee2384659',
                'ecb699f0-d02d-4490-b28d-5f31a5b952f2',
                'e847226e-b9c9-42fd-b1ac-fbd42064e6aa',
                'a3031bae-0b81-4269-a8f9-f3b5baa0ad38',
                'b78ac1ed-c843-4a6d-acf8-8f778f0b7118',
                'fdfa221c-90cc-47da-b34f-3677e620325c',
                '3e0ea5da-7492-4212-acbc-549be66ae5f6',
                'bf39b616-377d-44b4-9020-aa34e4f4b577',
                '685e4840-2f5b-4a6f-86b9-129c8fa8b575',
                '467d5c5a-401f-4510-94b6-3c36f45e0bfa',
                'b04767dc-8bf9-41f2-bcc7-7d3172ada334'
            )
        `);

    // Revert schema changes
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "supplier"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "unit"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "category"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "venue_id"`);
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD "last_used" TIMESTAMP WITH TIME ZONE`,
    );
  }
}
