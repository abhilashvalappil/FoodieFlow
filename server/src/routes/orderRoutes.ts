import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import Menu from '../models/menuModel.js';
import { MenuService } from '../services/menuService.js';
import { MenuController } from '../controllers/menuController.js';
import { OrderService } from '../services/orderService.js';
import { OrderController } from '../controllers/orderController.js';
import { validate } from '../middleware/orderValidate.js';
import { createOrderSchema } from '../schemas/orderSchema.js';

const router = express.Router();
const upload = multer({ storage });

const menuService = new MenuService()
const menuController = new MenuController(menuService)
const orderService = new OrderService()
const orderController = new OrderController(orderService)

router.get('/menu', menuController.getMenu.bind(menuController))
router.post('/menu', upload.single('image'), menuController.addMenu.bind(menuController))
router.post('/orders',validate(createOrderSchema), orderController.createOrder.bind(orderController))
router.get('/orders/:id', orderController.getOrder.bind(orderController))

export default router;
