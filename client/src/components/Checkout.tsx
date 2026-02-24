import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/service';

const Checkout: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const orderData = {
            deliveryDetails: {
                name: formData.name,
                address: formData.address,
                phoneNumber: Number(formData.phone.replace(/\D/g, ''))  
            },
            items: cartItems.map(item => ({
                menuItemId: item.id,
                quantity: item.quantity
            })),
            totalAmount: cartTotal
        };

        try {
            const createdOrder = await createOrder(orderData);
            localStorage.setItem('orderId', createdOrder._id)

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
                <p className="text-slate-500 mb-6">Thank you, {formData.name}. Your food is being prepared.</p>
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Delivery Address</label>
                            <textarea
                                required
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="123 Street Name, City"
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 890"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all duration-300 active:scale-[0.98] mt-4"
                        >
                            Place Order (${cartTotal.toFixed(2)})
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
                                <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-900">Total</span>
                        <span className="text-2xl font-black text-orange-500">${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
