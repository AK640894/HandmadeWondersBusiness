import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { CartItem } from '../types';

interface MyOrdersPageProps {
  navigateToHome: () => void;
}

const OrderCard: React.FC<{ order: CartItem[], orderNumber: number }> = ({ order, orderNumber }) => {
    const orderTotal = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order #{orderNumber}</h2>
            <ul role="list" className="divide-y divide-gray-200">
                {order.map(item => (
                    <li key={item.id} className="flex py-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.name}</h3>
                                    <p className="ml-4">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                                {item.selectedOption && <p className="mt-1 text-sm text-gray-500">{item.selectedOption}</p>}
                                <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg font-medium text-gray-900">
                    <p>Total</p>
                    <p>₹{orderTotal.toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    );
};


const MyOrdersPage: React.FC<MyOrdersPageProps> = ({ navigateToHome }) => {
  const { orders } = useAuth();

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-900">No Orders Yet</h1>
        <p className="mt-4 text-gray-600">You haven't placed any orders with us. Let's change that!</p>
        <div className="mt-8">
          <Button onClick={navigateToHome}>Start Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Order History</h1>
      <div className="space-y-6">
        {orders.map((order, index) => (
            <OrderCard key={index} order={order} orderNumber={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
