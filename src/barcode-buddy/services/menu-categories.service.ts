import { Repository } from "typeorm";
import { AppDataSource } from "../../config/database";
import { MenuCategories } from "../models/menu-categories.model";
import { Venue } from "../models/venue.model";
import { Menu } from "../models/menu.model";

export class MenuCategoriesService {
  private categoryRepository: Repository<MenuCategories>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(MenuCategories);
  }

  async getCategoriesByVenueId(venueId: string) {
    return this.categoryRepository.find({
      where: { venue: { id: venueId } },
      order: { name: "ASC" },
    });
  }

  async createCategory(data: {
    venueId: string;
    menuId: string;
    name: string;
    description?: string;
    displayOrder: number;
  }) {
    const venue = { id: data.venueId } as Venue;
    const menu = { id: data.menuId } as Menu;
    const category = this.categoryRepository.create({
      name: data.name,
      description: data.description,
      venue,
      menu,
      displayOrder: data.displayOrder,
    });
    return this.categoryRepository.save(category);
  }

  async updateCategory(
    categoryId: string,
    data: { name?: string; description?: string }
  ) {
    await this.categoryRepository.update(categoryId, data);
    return this.categoryRepository.findOne({ where: { id: categoryId } });
  }

  async deleteCategory(categoryId: string) {
    await this.categoryRepository.delete(categoryId);
  }
}
