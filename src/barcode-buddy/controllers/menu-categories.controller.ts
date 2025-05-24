import { Request, Response } from "express";
import { MenuCategoryService } from "../services/menu-categories.service";

export class MenuCategoryController {
  private service: MenuCategoryService;

  constructor() {
    this.service = new MenuCategoryService();
  }

  async getCategories(req: Request, res: Response) {
    const { venueId } = req.params;
    if (!venueId) {
      return res.status(400).json({ error: "venueId is required" });
    }
    try {
      const categories = await this.service.getCategoriesByVenueId(venueId);
      res.json({ data: categories });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
