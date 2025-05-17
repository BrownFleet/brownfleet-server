import { In, Repository } from "typeorm";
import { AppDataSource } from "../../config/database"; // Adjust path to your TypeORM DataSource
import { Menu } from "../models/menu.model";
import { MenuSection } from "../models/menu-section.model";
import { MenuItem } from "../models/menu-item.model";
import { IMenu, IMenuSection, IMenuItem } from "../types/menu.types";

export class MenuService {
  private menuRepository: Repository<Menu>;
  private menuSectionRepository: Repository<MenuSection>;
  private menuItemRepository: Repository<MenuItem>;

  constructor() {
    this.menuRepository = AppDataSource.getRepository(Menu);
    this.menuSectionRepository = AppDataSource.getRepository(MenuSection);
    this.menuItemRepository = AppDataSource.getRepository(MenuItem);
  }

  async getMenusByVenueId(venueId: string): Promise<IMenu[]> {
    // Fetch active menus for the given venueId
    const menus = await this.menuRepository.find({
      where: { venueId },
      select: ["id", "name", "description", "currency", "isActive"],
    });

    if (!menus || menus.length === 0) {
      return [];
    }

    // Fetch sections for the retrieved menu IDs
    const menuIds = menus.map((menu) => menu.id);
    const sections = await this.menuSectionRepository.find({
      where: { menuId: In(menuIds) },
      select: ["id", "menuId", "name", "description", "displayOrder"],
      order: { displayOrder: "ASC" },
    });

    // Fetch items for the retrieved section IDs
    const sectionIds = sections.map((section) => section.id);
    const items = await this.menuItemRepository.find({
      where: { sectionId: In(sectionIds), available: true },
      select: [
        "id",
        "sectionId",
        "name",
        "description",
        "price",
        "imageUrl",
        "isVegan",
        "isGlutenFree",
        "isSpicy",
        "allergens",
        "available",
        "isDiscounted",
        "discountPrice",
      ],
      order: { name: "ASC" },
    });

    // Transform data into IMenu structure
    const menusData: IMenu[] = menus.map((menu) => {
      const menuSections: IMenuSection[] = sections
        .filter((section) => section.menuId === menu.id)
        .map((section) => ({
          id: section.id,
          name: section.name,
          description: section.description,
          display_order: section.displayOrder,
          items: items
            .filter((item) => item.sectionId === section.id)
            .map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              image_url: item.imageUrl,
              is_vegan: item.isVegan,
              is_gluten_free: item.isGlutenFree,
              is_spicy: item.isSpicy,
              allergens: item.allergens,
              available: item.available,
              is_discounted: item.isDiscounted,
              discount_price: item.discountPrice,
            })),
        }));

      return {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        currency: menu.currency,
        is_active: menu.isActive,
        sections: menuSections,
      };
    });

    return menusData;
  }
}
