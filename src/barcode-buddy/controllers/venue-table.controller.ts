import { Request, Response } from "express";
import { VenueTableService } from "../services/venue-table.service";

export class VenueTableController {
  private tableService: VenueTableService;

  constructor() {
    this.tableService = new VenueTableService();
  }

  async getTables(req: Request, res: Response): Promise<void> {
    const venueId = req.query.venueId as string;
    const searchString = req.query.searchString as string | undefined;
    const tableStatus = req.query.tableStatus as string | undefined;

    if (!venueId) {
      res.status(400).json({ data: null, error: "venueId is required" });
      return;
    }

    try {
      const tables = await this.tableService.getTablesByVenueId(
        venueId,
        searchString,
        tableStatus,
      );
      res.status(200).json({ data: tables, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: (error as Error).message });
    }
  }
}
