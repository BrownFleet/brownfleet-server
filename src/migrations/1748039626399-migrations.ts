import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748039626399 implements MigrationInterface {
  name = "Migrations1748039626399";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add nullable columns first
    await queryRunner.query(`ALTER TABLE "menus" ADD "category_id" uuid`);
    await queryRunner.query(`ALTER TABLE "menus" ADD "price" double precision`);
    

    await queryRunner.query(
      `ALTER TABLE "menus" ADD "tags" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(`ALTER TABLE "menus" ADD "variants" jsonb`);
    await queryRunner.query(`ALTER TABLE "menus" ADD "image" text`);
    await queryRunner.query(
      `ALTER TABLE "menus" ADD "popular" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "menus" ADD "available" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(`ALTER TABLE "menus" ADD "preparationTime" text`);
    await queryRunner.query(
      `ALTER TABLE "menus" ADD "ingredients" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "menus" ADD "allergens" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(`ALTER TABLE "menus" ADD "calories" integer`);
    await queryRunner.query(
      `ALTER TABLE "menus" ADD "discount" double precision NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "menus" ADD "dietary" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "menus" ADD "rating" double precision`,
    );
    await queryRunner.query(`ALTER TABLE "menus" ADD "reviewsCount" integer`);
    await queryRunner.query(`ALTER TABLE "menus" ADD "comboDetails" jsonb`);
    await queryRunner.query(`ALTER TABLE "menus" ADD "internalNotes" text`);
    await queryRunner.query(
      `ALTER TABLE "menus" ADD "status" text NOT NULL DEFAULT 'draft'`,
    );

    await queryRunner.query(`
      INSERT INTO "menus" (
        id,
        venue_id,
        name,
        category_id,
        tags,
        price,
        variants,
        description,
        currency,
        is_active,
        image,
        popular,
        available,
        "preparationTime",
        ingredients,
        allergens,
        calories,
        discount,
        dietary,
        rating,
        "reviewsCount",
        "comboDetails",
        "internalNotes",
        status,
        created_at,
        updated_at
      ) VALUES
        (
          gen_random_uuid(),
          '012eeaab-5160-4e61-93af-41fdb59250f2',
          'Garlic Breadsticks',
          '5d61660b-6326-4fdc-ad33-7426a3348526',
          ARRAY['Vegetarian', 'Kids Favorite'],
          5.99,
          '[]',
          'Warm breadsticks brushed with garlic butter and herbs',
          'USD',
          true,
          '/images/appetizers/garlic-breadsticks.jpg',
          true,
          false,
          '10 min',
          ARRAY['Flour', 'Garlic', 'Butter', 'Herbs'],
          ARRAY['Gluten', 'Dairy'],
          320,
          0,
          '{"vegan": false, "vegetarian": true, "glutenFree": false}',
          4.3,
          78,
          NULL,
          'Offer garlic dip by default',
          'published',
          NOW(),
          NOW()
        ),
        (
          gen_random_uuid(),
          '2f591481-0742-4f7d-93fa-8cafac27a57c',
          'Spicy Paneer Pizza',
          'c1692d82-779f-4859-bfae-dc67320bba30',
          ARRAY['Vegetarian', 'Spicy'],
          9.99,
          '[]',
          'Paneer pizza with spicy sauce and veggies',
          'USD',
          true,
          '/images/pizza/spicy-paneer.jpg',
          true,
          true,
          '20 min',
          ARRAY['Paneer', 'Flour', 'Cheese', 'Spices'],
          ARRAY['Gluten', 'Dairy'],
          540,
          1.5,
          '{"vegan": false, "vegetarian": true, "glutenFree": false}',
          4.7,
          120,
          NULL,
          'Add extra chili flakes if requested',
          'published',
          NOW(),
          NOW()
        ),
        (
          gen_random_uuid(),
          '2f591481-0742-4f7d-93fa-8cafac27a57c',
          'Chicken Wings',
          '165617b9-678c-4f12-91c9-461ab79d3e34',
          ARRAY['Non-Vegetarian', 'Spicy'],
          7.99,
          '[]',
          'Crispy chicken wings tossed in spicy sauce',
          'USD',
          true,
          '/images/appetizers/chicken-wings.jpg',
          true,
          false,
          '15 min',
          ARRAY['Chicken', 'Spices', 'Oil'],
          ARRAY[''],
          420,
          0,
          '{"vegan": false, "vegetarian": false, "glutenFree": true}',
          4.5,
          95,
          NULL,
          'Serve with ranch dip',
          'published',
          NOW(),
          NOW()
        ),
        (
          gen_random_uuid(),
          '012eeaab-5160-4e61-93af-41fdb59250f2',
          'Vegan Salad Bowl',
          '155157d7-b8ce-4ebf-8b1c-2e7e2852e67f',
          ARRAY['Vegan', 'Healthy'],
          6.49,
          '[]',
          'Fresh salad bowl with seasonal veggies',
          'USD',
          true,
          '/images/salads/vegan-bowl.jpg',
          false,
          true,
          '8 min',
          ARRAY['Lettuce', 'Tomato', 'Cucumber', 'Carrot'],
          ARRAY[''],
          180,
          0,
          '{"vegan": true, "vegetarian": true, "glutenFree": true}',
          4.8,
          60,
          NULL,
          'No dressing by default',
          'published',
          NOW(),
          NOW()
        ),
        (
          gen_random_uuid(),
          '2f591481-0742-4f7d-93fa-8cafac27a57c',
          'Classic Margherita Pizza',
          'eed00b32-2e2e-4f4b-8e89-a0a8706968fc',
          ARRAY['Vegetarian', 'Classic'],
          8.49,
          '[]',
          'Classic pizza with tomato, mozzarella, and basil',
          'USD',
          true,
          '/images/pizza/margherita.jpg',
          true,
          false,
          '18 min',
          ARRAY['Flour', 'Tomato', 'Mozzarella', 'Basil'],
          ARRAY['Gluten', 'Dairy'],
          500,
          0,
          '{"vegan": false, "vegetarian": true, "glutenFree": false}',
          4.6,
          110,
          NULL,
          'Best seller',
          'published',
          NOW(),
          NOW()
        )
    `);

    // Now that data is populated, enforce NOT NULL
    await queryRunner.query(
      `ALTER TABLE "menus" ALTER COLUMN "category_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "menus" ALTER COLUMN "price" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "internalNotes"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "comboDetails"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "reviewsCount"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "rating"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "dietary"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "discount"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "calories"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "allergens"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "ingredients"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "preparationTime"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "available"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "popular"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "variants"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "tags"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "category_id"`);
  }
}
