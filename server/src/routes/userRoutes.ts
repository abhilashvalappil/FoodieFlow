import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import Menu from '../models/menuModel.js';
import { MenuService } from '../services/menuService.js';
import { MenuController } from '../controllers/menuController.js';

const router = express.Router();
const upload = multer({ storage });

const menuService = new MenuService()
const menuController = new MenuController(menuService)

router.get('/menu',menuController.getMenu.bind(menuController))
router.post('/menu', upload.single('image'),menuController.addMenu.bind(menuController) )

export default router;
