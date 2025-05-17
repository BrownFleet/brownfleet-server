import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import logger from "../shared/utils/logger";

let mcpClient: Client | null = null;

export const createMCPClient = async () => {
  if (mcpClient) return mcpClient;

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    logger.error("MISTRAL_API_KEY is not defined in environment variables");
    throw new Error("MISTRAL_API_KEY is not defined");
  }

  try {
    const client = new Client({
      name: "company-mcp-client",
      version: "1.0.0",
      auth: {
        apiKey,
      },
    });

    const transport = new StreamableHTTPClientTransport(
      new URL("https://api.mistral.ai/v1")
    );

    await client.connect(transport);
    mcpClient = client;
    return client;
  } catch (error) {
    logger.error("Failed to create MCP client", { error });
    throw new Error("MCP client initialization failed");
  }
};

// Initialize the client
export const initializeMCPClient = async () => {
  mcpClient = await createMCPClient();
  return mcpClient;
};

// Get the initialized client
export const getMCPClient = () => {
  if (!mcpClient) {
    throw new Error(
      "MCP client not initialized. Call initializeMCPClient first."
    );
  }
  return mcpClient;
};
