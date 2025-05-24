import { Router } from "express";
import { VenueTableController } from "../controllers/venue-table.controller";

const router = Router();
const venueTableController = new VenueTableController();

/**
 * @swagger
 * /venue-tables:
 *   get:
 *     summary: Get venue tables by venueId with optional filters
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
 *         description: Search string for table name
 *       - in: query
 *         name: tableStatus
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by table status (e.g., occupied, free, reserved)
 *     responses:
 *       200:
 *         description: List of venue tables
 */
router.get(
  "/venue-tables",
  venueTableController.getTables.bind(venueTableController),
);

export default router;
