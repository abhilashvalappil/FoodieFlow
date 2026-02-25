import type { IMenu } from "../interfaces/entities/menuInterface.js";
import type { IMenuService } from "../interfaces/serviceInterfaces/IMenuService.js";
import Menu from "../models/menuModel.js";

export class MenuService implements IMenuService {
    async getMenu(): Promise<IMenu[]>{
        const menuItems = await Menu.find().sort({ createdAt: -1 });
        return menuItems;
    }

    async addMenuItem(itemData: Partial<IMenu>): Promise<IMenu> {
        const newItem = new Menu(itemData);
        return await newItem.save();
    }
}