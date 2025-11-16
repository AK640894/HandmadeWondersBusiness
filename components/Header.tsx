import React from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { CartIcon, SparkleIcon } from './Icon';

interface HeaderProps {
  navigateToHome: () => void;
  navigateToCart: () => void;
  navigateToEarrings: () => void;
  navigateToNameplates: () => void;
  navigateToAbout: () => void;
  navigateToLogin: () => void;
  navigateToMyOrders: () => void;
}

const Header: React.FC<HeaderProps> = ({
  navigateToHome,
  navigateToCart,
  navigateToEarrings,
  navigateToNameplates,
  navigateToAbout,
  navigateToLogin,
  navigateToMyOrders,
}) => {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigateToHome();
  };

  return (
    <header className="bg-brand-cream/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={navigateToHome} className="flex-shrink-0 flex items-center gap-2">
              <SparkleIcon className="h-8 w-8 text-brand-terracotta" />
              <span className="font-serif text-2xl font-bold text-brand-dark">Handmade Wonders</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={navigateToHome} className="text-gray-700 hover:bg-brand-sage/20 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">Home</button>
              <button onClick={navigateToEarrings} className="text-gray-700 hover:bg-brand-sage/20 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">Earrings</button>
              <button onClick={navigateToNameplates} className="text-gray-700 hover:bg-brand-sage/20 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">Nameplates</button>
              <button onClick={navigateToAbout} className="text-gray-700 hover:bg-brand-sage/20 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">About</button>
              {currentUser && <button onClick={navigateToMyOrders} className="text-gray-700 hover:bg-brand-sage/20 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">My Orders</button>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                 <span className="text-sm text-gray-800 font-medium hidden sm:block">{currentUser.email}</span>
                <button onClick={handleLogout} className="text-gray-700 hover:bg-brand-sage/20 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              </div>
            ) : (
               <button onClick={navigateToLogin} className="hidden md:block text-gray-700 hover:bg-brand-sage/20 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">Login</button>
            )}
            <button onClick={navigateToCart} className="relative p-2 rounded-full text-gray-700 hover:bg-brand-sage/20 hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View shopping cart</span>
              <CartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-brand-terracotta rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;