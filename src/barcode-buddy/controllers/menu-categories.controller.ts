import { Request, Response } from "express";
import { MenuCategoriesService } from "../services/menu-categories.service";

export class MenuCategoriesController {
  private service: MenuCategoriesService;

  constructor() {
    this.service = new MenuCategoriesService();
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

  async createCategory(req: Request, res: Response) {
    const { venueId } = req.params;
    const { name, description, menuId, displayOrder } = req.body;
    if (!venueId || !name || !menuId) {
      return res
        .status(400)
        .json({ error: "venueId, menuId, and name are required" });
    }
    try {
      const category = await this.service.createCategory({
        venueId,
        menuId,
        name,
        description,
        displayOrder,
      });
      res.status(201).json({ data: category });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    if (!categoryId) {
      return res.status(400).json({ error: "categoryId is required" });
    }
    try {
      const category = await this.service.updateCategory(categoryId, {
        name,
        description,
      });
      res.json({ data: category });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({ error: "categoryId is required" });
    }
    try {
      await this.service.deleteCategory(categoryId);
      res.json({ data: true });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
