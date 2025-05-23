import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";
import { authenticateToken } from "../common/middleware/auth.middleware";

const router = Router();
const menuController = new MenuController();

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Get menus by venueId with optional filters
 *     security:
 *       - bearerAuth: []
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
 *         description: Search string for menu name
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by category ID
 *       - in: query
 *         name: isItemAvailable
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Filter by item availability (true/false)
 *     responses:
 *       200:
 *         description: List of menus
 */
router.get(
  "/menus",
  authenticateToken,
  menuController.getMenus.bind(menuController),
);

export default router;
