import { Router } from "express";
import { MenuCategoryController } from "../controllers/menu-categories.controller";

const router = Router();
const controller = new MenuCategoryController();

/**
 * @swagger
 * /venues/{venueId}/menu-categories:
 *   get:
 *     summary: Get menu categories for a venue
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The venue ID
 *     responses:
 *       200:
 *         description: List of menu categories
 */
router.get(
  "/venues/:venueId/menu-categories",
  controller.getCategories.bind(controller),
);

export default router;
