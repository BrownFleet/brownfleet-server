import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";

const router = Router();
const menuController = new MenuController();

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Get menus by venueId
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
router.get("/menus", menuController.getMenus.bind(menuController));

export default router;
