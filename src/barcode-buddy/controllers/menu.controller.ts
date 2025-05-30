import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";

export class MenuController {
  private menuService: MenuService;

  constructor() {
    this.menuService = new MenuService();
    console.log("MenuController initialized");
  }

  async getMenus(req: Request, res: Response): Promise<void> {
    const venueId = req.query.venueId as string;
    const searchString = req.query.searchString as string | undefined;
    const categoryId = req.query.categoryId as string | undefined;
    const isItemAvailable =
      req.query.isItemAvailable !== undefined
        ? req.query.isItemAvailable === "true"
        : undefined;

    if (!venueId) {
      res.status(400).json({ data: null, error: "Invalid or missing venueId" });
      return;
    }

    try {
      const menus = await this.menuService.getMenusByVenueId(
        venueId,
        searchString,
        categoryId,
        isItemAvailable,
      );
      res.status(200).json({ data: menus, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: (error as Error).message });
    }
  }

  async createMenu(req: Request, res: Response): Promise<void> {
    try {
      const menuData = req.body;
      const imageFile = req.file;
      const menu = await this.menuService.createMenu(menuData, imageFile);
      res.status(201).json({ data: menu, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: (error as Error).message });
    }
  }
}
