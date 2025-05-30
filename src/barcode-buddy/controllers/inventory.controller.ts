import { Request, Response } from "express";
import { InventoryService } from "../services/inventory.service";

export class InventoryController {
  private inventoryService: InventoryService;

  constructor() {
    this.inventoryService = new InventoryService();
  }

  async getInventoryList(req: Request, res: Response): Promise<void> {
    const venueId = req.query.venueId as string;
    const searchString = req.query.searchString as string | undefined;
    const category = req.query.category as string | undefined;
    const supplier = req.query.supplier as string | undefined;
    const status = req.query.status as string | undefined;

    if (!venueId) {
      res.status(400).json({ data: null, error: "venueId is required" });
      return;
    }

    try {
      const inventories = await this.inventoryService.getInventories(
        venueId,
        searchString,
        category,
        supplier,
        status
      );
      res.status(200).json({ data: inventories, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: (error as Error).message });
    }
  }
}