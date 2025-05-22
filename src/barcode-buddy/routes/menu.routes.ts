import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";
import { authenticateToken } from "../common/middleware/auth.middleware";

const router = Router();
const menuController = new MenuController();

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Get menus by venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: venueId
 *         schema:
 *           type: string
 *         required: true
 *         description: The venue ID
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
