import { Router } from "express";
import { MenuCategoriesController } from "../controllers/menu-categories.controller";

const router = Router();
const controller = new MenuCategoriesController();

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

/**
 * @swagger
 * /venues/{venueId}/menu-categories:
 *   post:
 *     summary: Create a menu category for a venue
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The venue ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - menuId
 *             properties:
 *               name:
 *                 type: string
 *               menuId:
 *                 type: string
 *                 description: The menu ID this category belongs to
 *               description:
 *                 type: string
 *               displayOrder:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Menu category created
 */
router.post(
  "/venues/:venueId/menu-categories",
  controller.createCategory.bind(controller),
);

/**
 * @swagger
 * /menu-categories/{categoryId}:
 *   put:
 *     summary: Update a menu category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               displayOrder:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Menu category updated
 */
router.put(
  "/menu-categories/:categoryId",
  controller.updateCategory.bind(controller),
);

/**
 * @swagger
 * /menu-categories/{categoryId}:
 *   delete:
 *     summary: Delete a menu category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Menu category deleted
 */
router.delete(
  "/menu-categories/:categoryId",
  controller.deleteCategory.bind(controller),
);

export default router;
