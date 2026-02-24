import type { IMenu } from "../entities/menuInterface.js";

export interface IMenuService {
    getMenu(): Promise<IMenu[]>;
    addMenuItem(itemData: Partial<IMenu>): Promise<IMenu>;
}
