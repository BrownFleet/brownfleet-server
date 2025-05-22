import * as express from "express";
import * as cors from "cors";
import { errorHandler } from "./shared/middleware/error.middleware";
import { connectDB } from "./config/database";
import mcpRoutes from "./barcode-buddy/routes/mcp.routes";
import menuRoutes from "./barcode-buddy/routes/menu.routes";

import { setupSwagger } from "./config/swagger";

const app = express();

// Initialize database connection
connectDB();

app.use(cors());
app.use(express.json());

// MCP Routes
app.use("/", mcpRoutes);
app.use("/", menuRoutes);
// Routes will be added here

setupSwagger(app);
app.use(errorHandler);

export default app;
