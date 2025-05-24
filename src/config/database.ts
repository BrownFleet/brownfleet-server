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
  synchronize: false, // Set to false in production
  logging: true,
  entities: isProd
    ? ["dist/barcode-buddy/models/**/*.js"]
    : ["src/barcode-buddy/models/**/*.ts"],
  migrations: isProd ? ["dist/migrations/**/*.js"] : ["src/migrations/**/*.ts"],
  subscribers: isProd
    ? ["dist/subscribers/**/*.js"]
    : ["src/subscribers/**/*.ts"],
  extra: {
    connectionTimeoutMillis: 5000, // Wait 5 seconds for connection
    maxRetries: 10, // Retry up to 10 times
    retryDelay: 3000, // Wait 3 seconds between retries
  },
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
