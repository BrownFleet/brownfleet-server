import express from "express";
import cors from "cors";
import { errorHandler } from "./barcode-buddy/common/middleware/error.middleware";
import { connectDB } from "./config/database";
import mcpRoutes from "./barcode-buddy/routes/mcp.routes";
import menuRoutes from "./barcode-buddy/routes/menu.routes";
import menuCategoryRoutes from "./barcode-buddy/routes/menu-categories.routes";

import { setupSwagger } from "./config/swagger";
import authRoutes from "./barcode-buddy/routes/auth.routes";

const app = express();

// Initialize database connection
connectDB();

app.use(cors());
app.use(express.json());

// MCP Routes
app.use("/", mcpRoutes);
app.use("/", menuRoutes);
app.use("/", menuCategoryRoutes);
app.use("/auth", authRoutes);
// Routes will be added here

setupSwagger(app);
app.use(errorHandler);

export default app;
