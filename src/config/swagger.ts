import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: ["./src/barcode-buddy/routes/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
