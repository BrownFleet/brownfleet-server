import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../../config/database";
import { Menu } from "../models/menu.model";
import { supabase } from "../../config/supabase";
import { parseArrayField, parseObjectField } from "../common/utils/parsing";

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

  async uploadImageToSupabase(file: Express.Multer.File): Promise<string> {
    const filePath = `menus/${Date.now()}_${file.originalname}`;
    const { data, error } = await supabase.storage
      .from("barcode-buddy-images")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });
    if (error) throw new Error(error.message);

    const { data: publicUrlData } = supabase.storage
      .from("barcode-buddy-images")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }

  async createMenu(
    menuData: Partial<Menu>,
    imageFile?: Express.Multer.File,
  ): Promise<Menu> {
    menuData.tags = parseArrayField(menuData.tags);
    menuData.ingredients = parseArrayField(menuData.ingredients);
    menuData.allergens = parseArrayField(menuData.allergens);
    menuData.variants = parseArrayField(menuData.variants);
    menuData.comboDetails = parseArrayField(menuData.comboDetails);

    menuData.dietary = parseObjectField(menuData.dietary);

    let imageUrl = menuData.image;
    if (imageFile) {
      imageUrl = await this.uploadImageToSupabase(imageFile);
    }
    const menu = this.menuRepository.create({ ...menuData, image: imageUrl });
    return this.menuRepository.save(menu);
  }

  async updateMenu(
    menuId: string,
    menuData: Partial<Menu>,
    imageFile?: Express.Multer.File,
  ): Promise<Menu | null> {
    menuData.tags = parseArrayField(menuData.tags);
    menuData.ingredients = parseArrayField(menuData.ingredients);
    menuData.allergens = parseArrayField(menuData.allergens);
    menuData.variants = parseArrayField(menuData.variants);
    menuData.comboDetails = parseArrayField(menuData.comboDetails);
    menuData.dietary = parseObjectField(menuData.dietary);

    if (imageFile) {
      menuData.image = await this.uploadImageToSupabase(imageFile);
    }

    await this.menuRepository.update(menuId, menuData);
    return this.menuRepository.findOneBy({ id: menuId });
  }

  async deleteMenu(menuId: string): Promise<void> {
    await this.menuRepository.delete(menuId);
  }
}
