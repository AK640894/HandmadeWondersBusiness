import React from 'react';
import { useCart } from '../hooks/useCart';
import Button from '../components/Button';
import { PlusIcon, MinusIcon, TrashIcon } from '../components/Icon';

interface CartPageProps {
  navigateToCheckout: () => void;
  navigateToHome: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ navigateToCheckout, navigateToHome }) => {
  const { cartItems, updateItemQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="mt-4 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
        <div className="mt-8">
          <Button onClick={navigateToHome}>Start Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover object-center" />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>{item.name}</h3>
                  <p className="ml-4">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
                {item.selectedOption && <p className="mt-1 text-sm text-gray-500">{item.selectedOption}</p>}
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="flex items-center border border-gray-300 rounded-md">
                   <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-500 hover:bg-gray-100"><MinusIcon /></button>
                   <p className="px-4">{item.quantity}</p>
                   <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-500 hover:bg-gray-100"><PlusIcon /></button>
                </div>
                <div className="flex">
                  <button type="button" onClick={() => removeFromCart(item.id)} className="font-medium text-brand-terracotta hover:text-brand-terracotta/80">
                    <TrashIcon className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 py-6">
        <div className="flex justify-between text-lg font-medium text-gray-900">
          <p>Subtotal</p>
          <p>₹{subtotal.toLocaleString('en-IN')}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Button onClick={navigateToCheckout} className="w-full">
            Proceed to Checkout
          </Button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <button type="button" onClick={navigateToHome} className="font-medium text-brand-terracotta hover:text-brand-terracotta/80">
              Continue Shopping<span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;