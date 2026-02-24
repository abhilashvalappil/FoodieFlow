import React from 'react';
import type { FoodItem } from '../types/food';

interface FoodCardProps {
    item: FoodItem;
    onAddToCart?: (item: FoodItem) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart }) => {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                    <span className="text-lg font-bold text-orange-600">${item.price.toFixed(2)}</span>
                </div>

                <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-2">
                    {item.description}
                </p>

                <button
                    onClick={() => onAddToCart?.(item)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group/btn"
                >
                    <span>Add to Cart</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Main-M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FoodCard;
