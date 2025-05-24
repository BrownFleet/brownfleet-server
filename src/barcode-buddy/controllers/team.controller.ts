import { Request, Response } from "express";
import { TeamService } from "../services/team.service";

export class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  async getTeams(req: Request, res: Response): Promise<void> {
    const venueId = req.query.venueId as string;
    const searchString = req.query.searchString as string | undefined;
    const roleId = req.query.roleId ? Number(req.query.roleId) : undefined;
    const status = req.query.status as string | undefined;

    if (!venueId) {
      res.status(400).json({ data: null, error: "venueId is required" });
      return;
    }

    try {
      const teams = await this.teamService.getTeams(
        venueId,
        searchString,
        roleId,
        status,
      );
      res.status(200).json({ data: teams, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: (error as Error).message });
    }
  }
}
