import { DataSource } from "typeorm";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from "./env";

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: isProd ? false : true, // Set to false in production
  logging: true,
  entities: isProd
    ? ["dist/barcode-buddy/models/**/*.js"]
    : ["src/barcode-buddy/models/**/*.ts"],
  migrations: isProd ? ["dist/migrations/**/*.js"] : ["src/migrations/**/*.ts"],
  subscribers: isProd
    ? ["dist/subscribers/**/*.js"]
    : ["src/subscribers/**/*.ts"],
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
