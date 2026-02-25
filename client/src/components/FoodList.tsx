import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import Cart from './Cart';
import type { FoodItem } from '../types/food';
import { getMenu } from '../api/service';

const FoodList: React.FC = () => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await getMenu();
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
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-grow">
                    {foodItems.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <p>No food items found. Add some to get started!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {foodItems.map((item) => (
                                <FoodCard
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-[400px] sticky top-8">
                    <Cart />
                </div>
            </div>
        </div>
    );
};

export default FoodList;
