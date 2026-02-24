import type { Request, Response } from "express";
import type { IMenuService } from "../interfaces/serviceInterfaces/IMenuService.js";

export class MenuController {
    private menuService: IMenuService;
    constructor(menuService: IMenuService) {
        this.menuService = menuService;
    }
    async getMenu(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.menuService.getMenu();
            res.json(response);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async addMenu(req: Request, res: Response) {
        try {
            const { name, description, price, category } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: 'Image is required' });
            }

            const savedItem = await this.menuService.addMenuItem({
                name,
                description,
                price: Number(price),
                category,
                image: req.file.path,
            });

            res.status(201).json(savedItem);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

}