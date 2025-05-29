import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../../config/database";
import { Team } from "../models/team.model";

export class TeamService {
  private teamRepository: Repository<Team>;

  constructor() {
    this.teamRepository = AppDataSource.getRepository(Team);
  }

  async getTeams(
    venueId: string,
    searchString?: string,
    roleId?: number,
    isAvailable?: boolean,
  ): Promise<Team[]> {
    const where: any = { venueId };

    if (searchString) {
      where.teamName = ILike(`%${searchString}%`);
    }
    if (roleId) {
      where.roleId = roleId;
    }
    if (isAvailable) {
      where.isAvailable = isAvailable;
    }

    return this.teamRepository.find({
      where,
      order: { teamName: "ASC" },
    });
  }
}
