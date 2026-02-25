import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, cartCount } = useCart();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-orange-100 border border-orange-50 text-center transition-all duration-300 hover:shadow-orange-200">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Cart is empty</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Add some delicious items from the menu to get started!</p>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-50 overflow-hidden transition-all duration-500 ease-in-out ${isCollapsed ? 'max-h-[80px]' : 'max-h-[800px]'}`}>
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-slate-900">
                            {cartCount}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold leading-tight">Your Order</h2>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{cartItems.length} Different Items</p>
                    </div>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Items List */}
            {!isCollapsed && (
                <div className="max-h-[400px] overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
                    {cartItems.map((item) => (
                        <div key={item.id} className="group flex items-center gap-4 py-2 hover:bg-slate-50 rounded-2xl transition-colors px-2 -mx-2">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{item.name}</h4>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                        className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center bg-slate-100 rounded-full p-0.5">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity - 1); }}
                                            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-orange-600 font-bold transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-xs font-bold text-slate-700 min-w-[24px] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity + 1); }}
                                            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-orange-600 font-bold transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">
                                        ₹{item.price * item.quantity}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            {!isCollapsed && (
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Subtotal</span>
                            <span className="font-bold text-slate-900">₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Delivery</span>
                            <span className="font-bold text-green-600">Free</span>
                        </div>
                        <div className="h-px bg-slate-200 my-4" />
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-slate-900">Total</span>
                            <span className="text-2xl font-black text-orange-500">
                                ₹{cartTotal}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/checkout')}
                        className="group w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_-10px_rgba(249,115,22,0.5)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                        <span>Checkout Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); clearCart(); }}
                        className="w-full mt-4 text-xs text-slate-400 hover:text-red-400 font-semibold transition-colors uppercase tracking-widest"
                    >
                        Reset Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
