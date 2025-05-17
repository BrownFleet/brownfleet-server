import * as express from "express";
import * as cors from "cors";
import { errorHandler } from "./shared/middleware/error.middleware";
import { connectDB } from "./config/database";
import mcpRoutes from "./barcode-buddy/routes/mcp.routes";
import menuRoutes from "./barcode-buddy/routes/menu.routes";

const app = express();

// Initialize database connection
connectDB();

app.use(cors());
app.use(express.json());

// MCP Routes
app.use("/api", mcpRoutes);
app.use("/api", menuRoutes);
// Routes will be added here

app.use(errorHandler);

export default app;
