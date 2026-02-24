import type { IMenu } from "../interfaces/entities/menuInterface.js";
import type { IMenuService } from "../interfaces/serviceInterfaces/IMenuService.js";
import Menu from "../models/menuModel.js";

export class MenuService implements IMenuService {
    constructor(){
    }
    async getMenu(): Promise<IMenu[]>{
        try {
            const menuItems = await Menu.find().sort({ createdAt: -1 });
            return menuItems;
        } catch (error: any) {
            throw error;
        }
    }

    async addMenuItem(itemData: Partial<IMenu>): Promise<IMenu> {
        try {
            const newItem = new Menu(itemData);
            return await newItem.save();
        } catch (error: any) {
            throw error;
        }
    }
}