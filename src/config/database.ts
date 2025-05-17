import { DataSource } from "typeorm";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from "./env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true, // Set to false in production
  logging: true,
  // entities: ["src/**/*.entity.ts"],
  entities: [
    "src/barcode-buddy/models/*.ts",
    "src/barcode-buddy/models/**/*.ts",
    "src/barcode-buddy/models/*.js",
    "src/barcode-buddy/models/**/*.js",
  ],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/*.ts"],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
    process.exit(1);
  }
};
