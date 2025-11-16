import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

interface CheckoutPageProps {
    navigateToHome: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigateToHome }) => {
  const { cartItems, clearCart } = useCart();
  const { currentUser, addOrder } = useAuth();
  const [isPaid, setIsPaid] = useState(false);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
        addOrder(cartItems);
    }
    setIsPaid(true);
    clearCart();
  };
  
  if (isPaid) {
    return (
      <div className="text-center py-20 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-brand-sage">Thank You!</h1>
        <p className="mt-4 text-gray-600">Your order has been placed successfully.</p>
        <div className="mt-8">
          <Button onClick={navigateToHome}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Checkout Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <form onSubmit={handlePayNow}>
          <div className="space-y-6">
            {/* Contact Information */}
            <section>
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue={currentUser?.email || ''} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" id="phone" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
              </div>
            </section>
            
            {/* Shipping Information */}
            <section>
              <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                 <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                    <input type="text" id="address1" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" id="city" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                    <input type="text" id="state" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip / Postal Code</label>
                    <input type="text" id="zip" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
              </div>
            </section>

             {/* Payment Details */}
            <section>
              <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input type="text" id="card-number" placeholder="•••• •••• •••• ••••" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                      <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input type="text" id="expiry-date" placeholder="MM / YY" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <input type="text" id="cvv" placeholder="•••" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
              </div>
            </section>
          </div>
          <div className="mt-8">
            <Button type="submit" className="w-full">
                Pay Now - ₹{subtotal.toLocaleString('en-IN')}
            </Button>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-8 rounded-lg border h-fit sticky top-24">
        <h3 className="text-xl font-bold mb-6">Order Summary</h3>
        <ul className="space-y-4">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between items-start">
              <div className="flex-shrink-0">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover"/>
              </div>
              <div className="flex-1 ml-4">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
            </li>
          ))}
        </ul>
        <div className="border-t mt-6 pt-6 space-y-2">
            <div className="flex justify-between font-medium">
                <p>Subtotal</p>
                <p>₹{subtotal.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
                <p>Shipping</p>
                <p>₹0.00</p>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                <p>Total</p>
                <p>₹{subtotal.toLocaleString('en-IN')}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;