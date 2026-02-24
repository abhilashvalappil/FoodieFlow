import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import type { FoodItem } from '../types/food';
import { fetchItems } from '../api/service';

const FoodList: React.FC = () => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetchItems();
                const items = response.map((item: any) => ({
                    ...item,
                    id: item._id,
                    category: item.category || 'General'
                }));
                setFoodItems(items);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch menu');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const handleAddToCart = (item: FoodItem) => {
        console.log(`Added to cart: ${item.name}`);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );

    if (error) return (
        <div className="text-center py-12 text-red-500">
            <p>Error: {error}</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Popular Dishes</h2>
                    <p className="text-slate-500 max-w-lg">
                        Hand-picked delicacies prepared with fresh ingredients and love by our world-class chefs.
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['All', 'Pizza', 'Burgers', 'Sushi', 'Main Course', 'Pasta', 'Salads', 'Appetizers', 'Desserts'].map((cat) => (
                        <button
                            key={cat}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === 'All'
                                ? 'bg-orange-600 text-white'
                                : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {foodItems.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                    <p>No food items found. Add some to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {foodItems.map((item) => (
                        <FoodCard
                            key={item.id}
                            item={item}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodList;
