import { Repository } from "typeorm";
import { AppDataSource } from "../../config/database";
import { MenuSection } from "../models/menu-categories.model";

export class MenuCategoryService {
  private categoryRepository: Repository<MenuSection>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(MenuSection);
  }

  async getCategoriesByVenueId(venueId: string) {
    // Fetch all categories for the given venueId directly
    return this.categoryRepository.find({
      where: { venueId },
      order: { displayOrder: "ASC" },
    });
  }
}
