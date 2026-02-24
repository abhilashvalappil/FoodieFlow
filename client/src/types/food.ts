export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface CartItem extends FoodItem {
    quantity: number;
}
