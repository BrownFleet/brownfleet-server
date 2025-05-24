import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../../config/database";
import { VenueTable } from "../models/venue-table.model";

export class VenueTableService {
  private tableRepository: Repository<VenueTable>;

  constructor() {
    this.tableRepository = AppDataSource.getRepository(VenueTable);
  }

  async getTablesByVenueId(
    venueId: string,
    searchString?: string,
    tableStatus?: string,
  ): Promise<VenueTable[]> {
    const where: any = { venueId };

    if (searchString) {
      where.tableName = ILike(`%${searchString}%`);
    }
    if (tableStatus) {
      where.status = tableStatus;
    }

    return this.tableRepository.find({
      where,
      order: { tableName: "ASC" },
    });
  }
}
