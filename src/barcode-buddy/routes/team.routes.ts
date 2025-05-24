import { Router } from "express";
import { TeamController } from "../controllers/team.controller";

const router = Router();
const teamController = new TeamController();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get team members by venueId with optional filters
 *     parameters:
 *       - in: query
 *         name: venueId
 *         schema:
 *           type: string
 *         required: true
 *         description: The venue ID
 *       - in: query
 *         name: searchString
 *         schema:
 *           type: string
 *         required: false
 *         description: Search string for team name
 *       - in: query
 *         name: roleId
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter by role ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by status (active/offline)
 *     responses:
 *       200:
 *         description: List of team members
 */
router.get("/teams", teamController.getTeams.bind(teamController));

export default router;
