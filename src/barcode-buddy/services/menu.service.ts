import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../../config/database";
import { Menu } from "../models/menu.model";
import { supabase } from "../../config/supabase";
import { parseArrayField, parseObjectField } from "../common/utils/parsing";
import { assignRelationId } from "../common/utils/assignRelationId";
import { RelationKeys } from "../common/enums/relationKeys";
import { Venue } from "../models/venue.model";
import { MenuSection } from "../models/menu-categories.model";
import { MenuDto } from "../dto/menu.dto";

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
  ): Promise<any[]> {
    const where: any = { venue: { id: venueId } };

    if (searchString) {
      where.name = ILike(`%${searchString}%`);
    }
    if (categoryId) {
      where.category = { id: categoryId };
    }
    if (typeof isItemAvailable === "boolean") {
      where.isAvailable = isItemAvailable;
    }

    const menus = await this.menuRepository.find({
      where,
      relations: ["category", "venue"],
      order: { name: "ASC" },
    });

    return menus.map((menu) => ({
      id: menu.id,
      venueId: menu.venue?.id,
      name: menu.name,
      category: menu.category
        ? { id: menu.category.id, name: menu.category.name }
        : null,
      tags: menu.tags,
      price: menu.price,
      variants: menu.variants,
      description: menu.description,
      currency: menu.currency,
      image: menu.image,
      popular: menu.popular,
      isAvailable: menu.isAvailable,
      preparationTime: menu.preparationTime,
      ingredients: menu.ingredients,
      allergens: menu.allergens,
      calories: menu.calories,
      discount: menu.discount,
      dietary: menu.dietary,
      rating: menu.rating,
      reviewsCount: menu.reviewsCount,
      comboDetails: menu.comboDetails,
      internalNotes: menu.internalNotes,
      status: menu.status,
      createdAt: menu.createdAt?.toISOString?.() ?? menu.createdAt,
      updatedAt: menu.updatedAt?.toISOString?.() ?? menu.updatedAt,
    }));
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
    menuData: MenuDto,
    imageFile?: Express.Multer.File,
  ): Promise<Menu> {
    menuData.tags = parseArrayField(menuData.tags);
    menuData.ingredients = parseArrayField(menuData.ingredients);
    menuData.allergens = parseArrayField(menuData.allergens);
    menuData.variants = parseArrayField(menuData.variants);
    menuData.comboDetails = parseArrayField(menuData.comboDetails);
    menuData.dietary = parseObjectField(menuData.dietary);

    assignRelationId(menuData, RelationKeys.Venue, Venue);
    assignRelationId(menuData, RelationKeys.Category, MenuSection);

    let imageUrl = menuData.image;
    if (imageFile) {
      imageUrl = await this.uploadImageToSupabase(imageFile);
    }
    const menu = this.menuRepository.create({ ...menuData, image: imageUrl });
    return this.menuRepository.save(menu);
  }

  async updateMenu(
    menuId: string,
    menuData: MenuDto,
    imageFile?: Express.Multer.File,
  ): Promise<Menu | null> {
    const updateData: Partial<Menu> = {
      name: menuData.name,
      tags: parseArrayField(menuData.tags),
      price: menuData.price,
      variants: parseArrayField(menuData.variants),
      description: menuData.description,
      currency: menuData.currency,
      image: menuData.image,
      popular: menuData.popular,
      isAvailable: menuData.isAvailable,
      preparationTime: menuData.preparationTime,
      ingredients: parseArrayField(menuData.ingredients),
      allergens: parseArrayField(menuData.allergens),
      calories: menuData.calories,
      discount: menuData.discount,
      dietary: parseObjectField(menuData.dietary),
      rating: menuData.rating,
      reviewsCount: menuData.reviewsCount,
      comboDetails: parseArrayField(menuData.comboDetails),
      internalNotes: menuData.internalNotes,
      status: menuData.status,
    };

    // Handle relations
    if (menuData.categoryId) {
      updateData.category = { id: menuData.categoryId } as MenuSection;
    }
    if (menuData.venueId) {
      updateData.venue = { id: menuData.venueId } as Venue;
    }

    // Handle image upload
    if (imageFile) {
      updateData.image = await this.uploadImageToSupabase(imageFile);
    }

    await this.menuRepository.update(menuId, updateData);
    return this.menuRepository.findOne({
      where: { id: menuId },
      relations: ["category", "venue"],
    });
  }

  async deleteMenu(menuId: string): Promise<void> {
    await this.menuRepository.delete(menuId);
  }
}
