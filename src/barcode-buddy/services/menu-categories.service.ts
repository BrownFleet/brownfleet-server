import { Repository } from "typeorm";
import { AppDataSource } from "../../config/database";
import { MenuSection } from "../models/menu-categories.model";

export class MenuCategoryService {
  private categoryRepository: Repository<MenuSection>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(MenuSection);
  }

  async getCategoriesByVenueId(venueId: string) {
    // Find all categories where the menu's venue_id matches
    return this.categoryRepository
      .createQueryBuilder("category")
      .innerJoin("menus", "menu", "category.menu_id = menu.id")
      .where("menu.venue_id = :venueId", { venueId })
      .orderBy("category.displayOrder", "ASC")
      .getMany();
  }
}
