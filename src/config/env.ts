import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";

// Database configuration
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = parseInt(process.env.DB_PORT || "5432");
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const DB_NAME = process.env.DB_NAME || "brownfleet";

console.log(
  "Database configuration:",
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
);
