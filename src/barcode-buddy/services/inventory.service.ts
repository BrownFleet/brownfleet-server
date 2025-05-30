import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../../config/database";
import { Inventory } from "../models/inventory.model";

export class InventoryService {
  private inventoryRepository: Repository<Inventory>;

  constructor() {
    this.inventoryRepository = AppDataSource.getRepository(Inventory);
  }

  async getInventories(
    venueId: string,
    searchString?: string,
    category?: string,
    supplier?: string,
    status?: string,
  ): Promise<Inventory[]> {
    const where: any = { venueId };

    if (searchString) {
      where.name = ILike(`%${searchString}%`);
    }
    if (category) {
      where.category = category;
    }
    if (supplier) {
      where.supplier = supplier;
    }
    if (status) {
      where.status = status;
    }

    return this.inventoryRepository.find({
      where,
      order: { name: "ASC" },
    });
  }
}
