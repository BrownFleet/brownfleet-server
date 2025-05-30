import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748549082663 implements MigrationInterface {
  name = "Migrations1748549082663";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."venues_status_enum" AS ENUM('active', 'inactive', 'under construction')`,
    );
    await queryRunner.query(
      `CREATE TABLE "venues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "address" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "postal_code" text NOT NULL, "country" text NOT NULL, "phone_number" text NOT NULL, "website_url" text, "total_tables" integer NOT NULL, "capacity" integer NOT NULL, "status" "public"."venues_status_enum" NOT NULL DEFAULT 'active', "description" text, "logo_url" text, "business_hours" jsonb NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "welcome_message" text, "usp" text, "specialties" text array NOT NULL, "venue_type_id" integer NOT NULL, CONSTRAINT "PK_cb0f885278d12384eb7a81818be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "venue_workers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "venue_id" uuid NOT NULL, "user_id" uuid NOT NULL, "role_id" uuid NOT NULL, "permissions" jsonb, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e0d7a2006fabe443efb2972f635" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "venue_washrooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "venue_id" uuid NOT NULL, "navigational_direction" text NOT NULL, "location" jsonb NOT NULL, "status" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_595bb3fec3e5d467650bd647da0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "venue_types" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_225080d3c45297d563c3e03d190" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "venue_tables" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "venue_id" uuid NOT NULL, "table_number" text NOT NULL, "qr_code" text NOT NULL, "status" text NOT NULL, "capacity" integer NOT NULL DEFAULT '0', "orders" integer NOT NULL DEFAULT '0', "time" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "table_name" text NOT NULL, CONSTRAINT "PK_6b5ca0ab2b9cba8cd9d1da368e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "profile_picture" text, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role_id" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "venue_daily_analytics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "venue_id" uuid NOT NULL, "date" date NOT NULL, "total_orders" integer NOT NULL, "orders_in_progress" integer NOT NULL, "cancelled_orders" integer NOT NULL, "total_revenue" numeric NOT NULL, "average_order_value" numeric NOT NULL, "customer_count" integer NOT NULL, "inventory_low_stock_count" integer NOT NULL, "employees_active_count" integer NOT NULL, "tables_filled" integer NOT NULL, "tables_empty" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_235592f2d6d173b86770caf4e7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "team_name" text NOT NULL, "name" text NOT NULL, "email" text, "phone" text, "address" text, "working_hours" integer NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE, "is_active" boolean NOT NULL DEFAULT true, "payment_type" text NOT NULL, "salary_or_rate" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role_id" integer NOT NULL, "venue_id" uuid NOT NULL, "image" text, "lastActive" text, "is_available" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "surveillance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "camera_name" text NOT NULL, "camera_type" text NOT NULL, "camera_location" text NOT NULL, "camera_status" boolean NOT NULL, "camera_url" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0369268a70fd28161375e02aff4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("role_id" SERIAL NOT NULL, "role_name" character varying(50) NOT NULL, CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("role_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" uuid NOT NULL, "amount" numeric NOT NULL, "payment_method" text NOT NULL, "payment_status" text NOT NULL, "transaction_id" text, "payment_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_price" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order_status_id" integer NOT NULL, "venue_id" uuid NOT NULL, "table_number" text NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "request_types" ("id" SERIAL NOT NULL, "type_name" text NOT NULL, "description" text, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_795c261c2ebf6beb3f417acd40b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_status" ("status_id" SERIAL NOT NULL, "status_name" character varying(50) NOT NULL, CONSTRAINT "PK_d58a31b1f29e7726599cde0b1c2" PRIMARY KEY ("status_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" uuid NOT NULL, "sender" text NOT NULL, "message" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_25d8eb6fb6e1ccb6b33e034ee28" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" uuid NOT NULL, "menu_item_id" uuid NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, "total_price" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_customization_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" uuid NOT NULL, "venue_id" uuid NOT NULL, "request_details" jsonb NOT NULL, "status" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "responded_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f29e22956f55df7a48cd5dc72b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "venue_id" uuid NOT NULL, "name" text NOT NULL, "category_id" uuid NOT NULL, "tags" text array NOT NULL DEFAULT '{}', "price" double precision NOT NULL, "variants" jsonb, "description" text, "currency" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "image" text, "popular" boolean NOT NULL DEFAULT false, "available" boolean NOT NULL DEFAULT true, "preparationTime" text, "ingredients" text array NOT NULL DEFAULT '{}', "allergens" text array NOT NULL DEFAULT '{}', "calories" integer, "discount" double precision NOT NULL DEFAULT '0', "dietary" jsonb, "rating" double precision, "reviewsCount" integer, "comboDetails" jsonb, "internalNotes" text, "status" text NOT NULL DEFAULT 'draft', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "section_id" uuid NOT NULL, "name" text NOT NULL, "description" text, "price" numeric NOT NULL, "image_url" text, "is_vegan" boolean NOT NULL DEFAULT false, "is_gluten_free" boolean NOT NULL DEFAULT false, "is_spicy" boolean NOT NULL DEFAULT false, "allergens" text array, "available" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_discounted" boolean NOT NULL DEFAULT false, "discount_price" numeric, CONSTRAINT "PK_57e6188f929e5dc6919168620c8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "menu_id" uuid NOT NULL, "venue_id" uuid NOT NULL, "name" text NOT NULL, "description" text, "display_order" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_124ae987900336f983881cb04e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "venue_table_id" uuid NOT NULL, "user_id" uuid NOT NULL, "total_price" numeric NOT NULL, "status" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, "category" text, "unit" text, "supplier" text, "status" text, "quantity" integer NOT NULL, "threshold_value" integer NOT NULL, "unit_price" numeric NOT NULL, "last_received" TIMESTAMP WITH TIME ZONE, "expiration_date" date, "notes" text, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cart_id" uuid NOT NULL, "menu_item_id" uuid NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, "total_price" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "status" text NOT NULL, "image_url" text, "video_url" text, "discount_type" text, "discount_value" numeric, "combo_deal" text, "menu_items" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assistance_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "venue_table_id" uuid NOT NULL, "request_type_id" integer NOT NULL, "status" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "metadata" jsonb, CONSTRAINT "PK_944a7bc065921be9d453c8d4957" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(`
            INSERT INTO "inventory" (
                id, name, description, category, unit, supplier, status, quantity, threshold_value, unit_price, last_received, expiration_date, notes, is_active, created_at, updated_at
            ) VALUES
            (uuid_generate_v4(), 'Tomato Sauce', 'Fresh tomato sauce for pizzas and pastas', 'Sauces', 'liters', 'Fresh Farms Suppliers', 'good', 25, 10, 2.5, '2025-05-25', '2025-07-01', 'Keep refrigerated', true, now(), now()),
            (uuid_generate_v4(), 'Chicken Breast', 'Boneless chicken breast', 'Meat', 'kg', 'Premium Poultry Co.', 'low', 8, 15, 12.99, '2025-05-22', '2025-06-05', '', true, now(), now()),
            (uuid_generate_v4(), 'Flour', 'All-purpose flour', 'Dry Goods', 'kg', 'Baker''s Supply Inc.', 'low', 15, 20, 2.49, '2025-05-15', '2025-11-15', '', true, now(), now()),
            (uuid_generate_v4(), 'Olive Oil', 'Extra virgin olive oil', 'Oils', 'bottles', 'Mediterranean Imports', 'critical', 3, 8, 8.99, '2025-05-10', '2025-12-10', '', true, now(), now()),
            (uuid_generate_v4(), 'Mozzarella Cheese', 'Shredded mozzarella cheese', 'Dairy', 'kg', 'Dairy Delights', 'good', 10, 5, 9.99, '2025-05-23', '2025-06-15', '', true, now(), now()),
            (uuid_generate_v4(), 'Basil', 'Fresh basil leaves', 'Herbs', 'bunches', 'Herb Garden Farms', 'low', 5, 10, 1.99, '2025-05-26', '2025-06-02', '', true, now(), now()),
            (uuid_generate_v4(), 'Garlic', 'Fresh garlic heads', 'Vegetables', 'heads', 'Fresh Farms Suppliers', 'low', 12, 15, 0.99, '2025-05-20', '2025-07-20', '', true, now(), now()),
            (uuid_generate_v4(), 'Red Wine', 'House red wine', 'Beverages', 'bottles', 'Vineyard Selections', 'critical', 2, 6, 15.99, '2025-05-05', '2026-05-05', '', true, now(), now()),
            (uuid_generate_v4(), 'Pasta', 'Italian pasta', 'Dry Goods', 'kg', 'Italian Imports Co.', 'good', 20, 10, 2.99, '2025-05-18', '2025-11-18', '', true, now(), now()),
            (uuid_generate_v4(), 'Beef Sirloin', 'Premium beef sirloin', 'Meat', 'kg', 'Premium Meats Inc.', 'low', 6, 10, 18.99, '2025-05-24', '2025-06-07', '', true, now(), now()),
            (uuid_generate_v4(), 'Heavy Cream', 'Rich heavy cream', 'Dairy', 'liters', 'Dairy Delights', 'low', 4, 8, 4.99, '2025-05-21', '2025-06-10', '', true, now(), now()),
            (uuid_generate_v4(), 'Potatoes', 'Fresh potatoes', 'Vegetables', 'kg', 'Fresh Farms Suppliers', 'good', 30, 15, 1.99, '2025-05-19', '2025-07-19', '', true, now(), now())
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "inventory" WHERE name IN (
            'Tomato Sauce', 'Chicken Breast', 'Flour', 'Olive Oil', 'Mozzarella Cheese', 'Basil', 'Garlic', 'Red Wine', 'Pasta', 'Beef Sirloin', 'Heavy Cream', 'Potatoes'
        )`);
    await queryRunner.query(`DROP TABLE "assistance_requests"`);
    await queryRunner.query(`DROP TABLE "campaigns"`);
    await queryRunner.query(`DROP TABLE "cart_items"`);
    await queryRunner.query(`DROP TABLE "inventory"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TABLE "menu_categories"`);
    await queryRunner.query(`DROP TABLE "menu_items"`);
    await queryRunner.query(`DROP TABLE "menus"`);
    await queryRunner.query(`DROP TABLE "order_customization_requests"`);
    await queryRunner.query(`DROP TABLE "order_items"`);
    await queryRunner.query(`DROP TABLE "order_messages"`);
    await queryRunner.query(`DROP TABLE "order_status"`);
    await queryRunner.query(`DROP TABLE "request_types"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "surveillance"`);
    await queryRunner.query(`DROP TABLE "teams"`);
    await queryRunner.query(`DROP TABLE "venue_daily_analytics"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "venue_tables"`);
    await queryRunner.query(`DROP TABLE "venue_types"`);
    await queryRunner.query(`DROP TABLE "venue_washrooms"`);
    await queryRunner.query(`DROP TABLE "venue_workers"`);
    await queryRunner.query(`DROP TABLE "venues"`);
    await queryRunner.query(`DROP TYPE "public"."venues_status_enum"`);
  }
}
