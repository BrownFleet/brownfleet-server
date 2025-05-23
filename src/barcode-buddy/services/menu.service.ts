import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../../config/database";
import { Menu } from "../models/menu.model";

export class MenuService {
  private menuRepository: Repository<Menu>;

  constructor() {
    this.menuRepository = AppDataSource.getRepository(Menu);
  }

  async getMenusByVenueId(
    venueId: string,
    searchString?: string,
    categoryId?: string,
    isItemAvailable?: boolean,
  ): Promise<Menu[]> {
    const where: any = { venueId };

    if (searchString) {
      where.name = ILike(`%${searchString}%`);
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (typeof isItemAvailable === "boolean") {
      where.available = isItemAvailable;
    }

    return this.menuRepository.find({
      where,
      order: { name: "ASC" },
    });
  }
}
