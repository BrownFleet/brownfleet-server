import * as swaggerJsdoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

import { Express } from "express";

export function setupSwagger(app: Express) {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "BarcodeBuddy API Docs",
        version: "1.0.0",
        description: "API documentation BarcodeBuddy app",
      },
      servers: [{ url: process.env.BASE_URL || "http://localhost:3000" }],
    },
    apis: ["./src/barcode-buddy/routes/*.ts"], // adjust as needed
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
