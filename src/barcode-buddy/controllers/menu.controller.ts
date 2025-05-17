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

    if (!venueId) {
      res.status(400).json({ data: null, error: "Invalid or missing venueId" });
      return;
    }

    try {
      const menus = await this.menuService.getMenusByVenueId(venueId);
      res.status(200).json({ data: menus, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: (error as Error).message });
    }
  }
}
