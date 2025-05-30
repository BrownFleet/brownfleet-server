import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller";

const router = Router();
const inventoryController = new InventoryController();

/**
 * @swagger
 * /inventories:
 *   get:
 *     summary: Get inventory items by venueId with optional filters
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
 *         description: Search string for inventory name or description
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by category
 *       - in: query
 *         name: supplier
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by supplier
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of inventory items
 */
router.get(
  "/inventories",
  inventoryController.getInventoryList.bind(inventoryController),
);

export default router;
