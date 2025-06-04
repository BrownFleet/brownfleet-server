import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";
import { authenticateToken } from "../common/middleware/auth.middleware";
import multer from "multer";

const upload = multer();

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
  // authenticateToken, TODO: add it once login logout UI added on F.E
  menuController.getMenus.bind(menuController),
);

/**
 * @swagger
 * /menus:
 *   post:
 *     summary: Create a new menu item
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the menu item
 *               venueId:
 *                 type: string
 *                 description: Venue ID
 *               categoryId:
 *                 type: string
 *                 description: Category ID
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags for the menu item
 *               price:
 *                 type: number
 *                 description: Price of the menu item
 *               variants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Variants for the menu item
 *               description:
 *                 type: string
 *                 description: Description of the menu item
 *               currency:
 *                 type: string
 *                 description: Currency code (e.g., USD)
 *               isActive:
 *                 type: boolean
 *                 description: Is the menu item active
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *               popular:
 *                 type: boolean
 *                 description: Is the item popular
 *               available:
 *                 type: boolean
 *                 description: Is the item available
 *               preparationTime:
 *                 type: string
 *                 description: Preparation time
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Ingredients
 *               allergens:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Allergens
 *               calories:
 *                 type: number
 *                 description: Calories
 *               discount:
 *                 type: number
 *                 description: Discount
 *               dietary:
 *                 type: object
 *                 properties:
 *                   vegan:
 *                     type: boolean
 *                   vegetarian:
 *                     type: boolean
 *                   glutenFree:
 *                     type: boolean
 *                 description: Dietary info
 *               rating:
 *                 type: number
 *                 description: Rating
 *               reviewsCount:
 *                 type: number
 *                 description: Number of reviews
 *               comboDetails:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Combo details
 *               internalNotes:
 *                 type: string
 *                 description: Internal notes
 *               status:
 *                 type: string
 *                 description: Status (e.g., draft, published)
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post(
  "/menus",
  upload.single("image"),
  menuController.createMenu.bind(menuController),
);

/**
 * @swagger
 * /menus/{id}:
 *   put:
 *     summary: Update a menu item
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the menu item
 *               categoryId:
*                 type: string
*                 description: Category ID (UUID)
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags for the menu item
 *               price:
 *                 type: number
 *                 description: Price of the menu item
 *               variants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Variants for the menu item
 *               description:
 *                 type: string
 *                 description: Description of the menu item
 *               currency:
 *                 type: string
 *                 description: Currency code (e.g., USD)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *               popular:
 *                 type: boolean
 *                 description: Is the item popular
 *               isAvailable:
 *                 type: boolean
 *                 description: Is the item available
 *               preparationTime:
 *                 type: string
 *                 description: Preparation time
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Ingredients
 *               allergens:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Allergens
 *               calories:
 *                 type: number
 *                 description: Calories
 *               discount:
 *                 type: number
 *                 description: Discount
 *               dietary:
 *                 type: object
 *                 properties:
 *                   vegan:
 *                     type: boolean
 *                   vegetarian:
 *                     type: boolean
 *                   glutenFree:
 *                     type: boolean
 *                 description: Dietary info
 *               rating:
 *                 type: number
 *                 description: Rating
 *               reviewsCount:
 *                 type: number
 *                 description: Number of reviews
 *               comboDetails:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Combo details
 *               internalNotes:
 *                 type: string
 *                 description: Internal notes
 *               status:
 *                 type: string
 *                 description: Status (e.g., draft, published)
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */
router.put(
  "/menus/:id",
  upload.single("image"),
  menuController.updateMenu.bind(menuController),
);

/**
 * @swagger
 * /menus/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */
router.delete("/menus/:id", menuController.deleteMenu.bind(menuController));

/**
 * @swagger
 * /menus/{id}:
 *   patch:
 *     summary: Partially update a menu item
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the menu item
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags for the menu item
 *               price:
 *                 type: number
 *                 description: Price of the menu item
 *               variants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Variants for the menu item
 *               description:
 *                 type: string
 *                 description: Description of the menu item
 *               currency:
 *                 type: string
 *                 description: Currency code (e.g., USD)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *               popular:
 *                 type: boolean
 *                 description: Is the item popular
 *               isAvailable:
 *                 type: boolean
 *                 description: Is the item available (in stock)
 *               preparationTime:
 *                 type: string
 *                 description: Preparation time
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Ingredients
 *               allergens:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Allergens
 *               calories:
 *                 type: number
 *                 description: Calories
 *               discount:
 *                 type: number
 *                 description: Discount
 *               dietary:
 *                 type: object
 *                 properties:
 *                   vegan:
 *                     type: boolean
 *                   vegetarian:
 *                     type: boolean
 *                   glutenFree:
 *                     type: boolean
 *                 description: Dietary info
 *               rating:
 *                 type: number
 *                 description: Rating
 *               reviewsCount:
 *                 type: number
 *                 description: Number of reviews
 *               comboDetails:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Combo details
 *               internalNotes:
 *                 type: string
 *                 description: Internal notes
 *               status:
 *                 type: string
 *                 description: Status (e.g., draft, published)
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */
router.patch(
  "/menus/:id",
  upload.single("image"),
  menuController.updateMenu.bind(menuController),
);
export default router;
