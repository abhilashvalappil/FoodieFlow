import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/service';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from '../validations/checkoutSchema';
import type { CheckoutFormData } from "../validations/checkoutSchema";

const Checkout: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedName, setSubmittedName] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    });


    const onSubmit = async (data: CheckoutFormData) => {
        const orderData = {
            deliveryDetails: {
                name: data.name.trim(),
                address: data.address.trim(),
                phoneNumber: Number(data.phone.replace(/\D/g, ""))
            },
            items: cartItems.map((item) => ({
                menuItemId: item.id,
                quantity: item.quantity,
            })),
            totalAmount: cartTotal,
        };

        try {
            const createdOrder = await createOrder(orderData);
            localStorage.setItem('orderId', createdOrder._id)
            setSubmittedName(data.name);
            setIsSubmitted(true);
            setTimeout(() => {
                clearCart();
                navigate(`/order/${createdOrder._id}`);
            }, 3000);
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    if (isSubmitted) {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-2xl text-center border border-green-50">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Successful!</h2>
                <p className="text-slate-500 mb-6">Thank you, {submittedName}. Your food is being prepared.</p>
                <div className="space-y-3">
                    <p className="text-sm text-slate-400">Redirecting to order tracking...</p>
                    <div className="flex justify-center">
                        <div className="animate-bounce bg-orange-500 p-2 w-10 h-10 ring-1 ring-slate-900/5 shadow-lg rounded-full flex items-center justify-center text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate('/')}
                    className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                >
                    Back to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate('/')}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Menu
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Delivery Form */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-50">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Delivery Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                            <input
                                {...register("name")}
                                placeholder="John Doe"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-slate-200"
                                    }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Delivery Address</label>
                            <textarea
                                {...register("address")}
                                rows={3}
                                placeholder="123 Street Name, City"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.address ? "border-red-500" : "border-slate-200"
                                    }`}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                {...register("phone")}
                                placeholder="+1 234 567 890"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-slate-200"
                                    }`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed ..."
                        >
                            {isSubmitting
                                ? "Placing Order..."
                                : `Place Order (₹${cartTotal})`}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 h-fit">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span className="text-slate-600">
                                    <span className="font-bold text-slate-800">{item.quantity}x</span> {item.name}
                                </span>
                                <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-900">Total</span>
                        <span className="text-2xl font-black text-orange-500">₹{cartTotal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
