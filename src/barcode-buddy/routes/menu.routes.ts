import { Router } from 'express';
import { MenuController } from '../controllers/menu.controller';

const router = Router();
const menuController = new MenuController();

router.get('/menus', menuController.getMenus.bind(menuController));

export default router;