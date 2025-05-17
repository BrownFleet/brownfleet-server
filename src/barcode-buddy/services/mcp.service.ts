import { getMCPClient } from "../../config/mcp.config";
import logger from "../../shared/utils/logger";
import { ToolResponse } from "../types/mcp.types";

const SYSTEM_PROMPT = `You are Barcode Buddy, a restaurant service assistant for a specific venue and table. Your only tools are:
- getMenu: Fetches the menu.
- createOrder, removeOrder: Manages orders.
- makePayment: Processes payments.
- Other tools as added (e.g., assistance, order status).

If the user asks for any food item always shows the menu in any way do not genrate a single dish from your own
(e.g., "Show me the menu," "What's on the menu," "Menu please," , "special", "stakes","Can I see the menu"), you MUST call the getMenu tool and respond ONLY with "Here's the menu for today. Please feel free to choose any item to order:"—no exceptions. Do NOT generate any text beyond that, and do NOT ask follow-up questions or suggest anything. The tool's result provides the menu data for the UI. For other tasks, use the appropriate tool and keep responses short (e.g., "Order placed!" after createOrder). Never mention or suggest any items not in the getMenu tool's results. If a tool needs venueId or tableNumber, use the provided values or ask the user if missing. If unsure about non-menu requests, ask for clarification.`;

export class MCPService {
  private venueId: string;
  private tableNumber: string;
  private client: ReturnType<typeof getMCPClient>;

  constructor(venueId: string, tableNumber: string) {
    this.venueId = venueId;
    this.tableNumber = tableNumber;
    this.client = getMCPClient();
  }

  async getMenu() {
    try {
      const response = (await this.client.callTool({
        name: "getMenu",
        arguments: {
          venueId: this.venueId,
          tableNumber: this.tableNumber,
        },
      })) as ToolResponse;
      return response.content[0].text;
    } catch (error) {
      logger.error("Error fetching menu:", error);
      throw new Error("Failed to fetch menu");
    }
  }

  async createOrder(items: Array<{ itemId: string; quantity: number }>) {
    try {
      const response = (await this.client.callTool({
        name: "createOrder",
        arguments: {
          venueId: this.venueId,
          tableNumber: this.tableNumber,
          items,
        },
      })) as ToolResponse;
      return response.content[0].text;
    } catch (error) {
      logger.error("Error creating order:", error);
      throw new Error("Failed to create order");
    }
  }

  async removeOrder(orderId: string) {
    try {
      const response = (await this.client.callTool({
        name: "removeOrder",
        arguments: {
          venueId: this.venueId,
          tableNumber: this.tableNumber,
          orderId,
        },
      })) as ToolResponse;
      return response.content[0].text;
    } catch (error) {
      logger.error("Error removing order:", error);
      throw new Error("Failed to remove order");
    }
  }

  async makePayment(amount: number, paymentMethod: string) {
    try {
      const response = (await this.client.callTool({
        name: "makePayment",
        arguments: {
          venueId: this.venueId,
          tableNumber: this.tableNumber,
          amount,
          paymentMethod,
        },
      })) as ToolResponse;
      return response.content[0].text;
    } catch (error) {
      logger.error("Error processing payment:", error);
      throw new Error("Failed to process payment");
    }
  }

  async getWashroomInfo() {
    try {
      const response = (await this.client.callTool({
        name: "getWashroomInfo",
        arguments: {
          venueId: this.venueId,
          tableNumber: this.tableNumber,
        },
      })) as ToolResponse;
      response.content[0].text;
    } catch (error) {
      logger.error("Error fetching washroom info:", error);
      throw new Error("Failed to fetch washroom information");
    }
  }

  async handleUserQuery(query: string) {
    try {
      const response = (await this.client.callTool({
        name: "handleQuery",
        arguments: {
          venueId: this.venueId,
          tableNumber: this.tableNumber,
          query,
          systemPrompt: SYSTEM_PROMPT,
        },
      })) as ToolResponse;
      return response.content[0].text;
    } catch (error) {
      logger.error("Error handling user query:", error);
      throw new Error("Failed to process user query");
    }
  }
}

// Factory function to create MCPService instance
export const createMCPService = (venueId: string, tableNumber: string) => {
  return new MCPService(venueId, tableNumber);
};
