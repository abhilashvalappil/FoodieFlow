import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../api/service';

interface OrderDetails {
    _id: string;
    status: "Order Received" | "Preparing" | "Out for Delivery" | "Delivered";
    totalAmount: number;
    deliveryDetails: {
        name: string;
        address: string;
    };
    createdAt: string;
}

const OrderTracking: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchOrderStatus = async () => {
        if (!orderId) return;
        try {
            const data = await getOrder(orderId);
            setOrder(data);
            setLoading(false);

            if (data.status === "Delivered") {
            }
        } catch (err) {
            console.error('Failed to fetch order status:', err);
            setError('Failed to load order tracking information.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderStatus();

        // Poll every 5 seconds for updates
        const interval = setInterval(fetchOrderStatus, 5000);

        return () => clearInterval(interval);
    }, [orderId]);

    const getStatusStep = (status: string) => {
        const steps = ["Order Received", "Preparing", "Out for Delivery", "Delivered"];
        return steps.indexOf(status);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Oops!</h2>
                <p className="text-slate-500 mb-6">{error || "Order not found"}</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const currentStep = getStatusStep(order.status);
    const steps = [
        { title: "Order Received", icon: "📋" },
        { title: "Preparing", icon: "👨‍🍳" },
        { title: "Out for Delivery", icon: "🛵" },
        { title: "Delivered", icon: "✅" }
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-50">
                {/* Header */}
                <div className="bg-orange-500 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-orange-400 rounded-full opacity-20 blur-2xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-black mb-2">Track Your Order</h1>
                        <p className="opacity-90 font-medium">Order ID: #{orderId?.slice(-6).toUpperCase()}</p>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    {/* Status Progress Bar */}
                    <div className="relative mb-16 px-4">
                        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                        <div
                            className="absolute top-1/2 left-0 h-1.5 bg-orange-500 -translate-y-1/2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        ></div>

                        <div className="relative flex justify-between">
                            {steps.map((step, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4 transition-all duration-500 ${index <= currentStep
                                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 scale-110'
                                                : 'bg-white text-slate-400 border-4 border-slate-100'
                                            }`}
                                    >
                                        {step.icon}
                                    </div>
                                    <span className={`text-xs md:text-sm font-bold text-center max-w-[80px] ${index <= currentStep ? 'text-slate-900' : 'text-slate-400'
                                        }`}>
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Information */}
                    <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                Delivery Address
                            </h3>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="font-bold text-slate-800 mb-1">{order.deliveryDetails.name}</p>
                                <p className="text-slate-600 leading-relaxed">{order.deliveryDetails.address}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                                Order Summary
                            </h3>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-600">Status</span>
                                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-slate-200 mt-2">
                                    <span className="text-slate-600">Total Amount</span>
                                    <span className="text-xl font-black text-slate-900">${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home Button */}
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 font-bold transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
