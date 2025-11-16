import React, { useState, useCallback } from 'react';
import { Product, View } from './types';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import NameplateCustomizerPage from './pages/NameplateCustomizerPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';
import EarringsPage from './pages/EarringsPage';
import NameplatesPage from './pages/NameplatesPage';
import AboutPage from './pages/AboutPage';
import AllProductsPage from './pages/AllProductsPage';
import LoginPage from './pages/LoginPage';
import MyOrdersPage from './pages/MyOrdersPage';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ name: 'home' });

  const navigateToHome = useCallback(() => setView({ name: 'home' }), []);
  const navigateToCart = useCallback(() => setView({ name: 'cart' }), []);
  const navigateToCheckout = useCallback(() => setView({ name: 'checkout' }), []);
  const navigateToEarrings = useCallback(() => setView({ name: 'earrings' }), []);
  const navigateToNameplates = useCallback(() => setView({ name: 'nameplates' }), []);
  const navigateToAbout = useCallback(() => setView({ name: 'about' }), []);
  const navigateToAllProducts = useCallback(() => setView({ name: 'all-products' }), []);
  const navigateToLogin = useCallback(() => setView({ name: 'login' }), []);
  const navigateToMyOrders = useCallback(() => setView({ name: 'my-orders' }), []);

  const navigateToProduct = useCallback((product: Product) => {
    window.scrollTo(0, 0);
    if (product.category === 'nameplates') {
      setView({ name: 'nameplate', product });
    } else {
      setView({ name: 'product', product });
    }
  }, []);

  const renderView = () => {
    switch (view.name) {
      case 'home':
        return <HomePage navigateToProduct={navigateToProduct} navigateToAllProducts={navigateToAllProducts} />;
      case 'earrings':
        return <EarringsPage navigateToProduct={navigateToProduct} navigateToHome={navigateToHome} />;
      case 'nameplates':
        return <NameplatesPage navigateToProduct={navigateToProduct} navigateToHome={navigateToHome} />;
      case 'product':
        return <ProductPage product={view.product} navigateToHome={navigateToHome} />;
      case 'nameplate':
        return <NameplateCustomizerPage product={view.product} navigateToHome={navigateToHome} />;
      case 'cart':
        return <CartPage navigateToCheckout={navigateToCheckout} navigateToHome={navigateToHome} />;
      case 'checkout':
        return <CheckoutPage navigateToHome={navigateToHome} />;
      case 'about':
        return <AboutPage navigateToHome={navigateToHome} />;
      case 'all-products':
        return <AllProductsPage navigateToProduct={navigateToProduct} navigateToHome={navigateToHome} />;
      case 'login':
        return <LoginPage navigateToHome={navigateToHome} />;
      case 'my-orders':
        return <MyOrdersPage navigateToHome={navigateToHome} />;
      default:
        return <HomePage navigateToProduct={navigateToProduct} navigateToAllProducts={navigateToAllProducts} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen font-sans">
          <Header
            navigateToHome={navigateToHome}
            navigateToCart={navigateToCart}
            navigateToEarrings={navigateToEarrings}
            navigateToNameplates={navigateToNameplates}
            navigateToAbout={navigateToAbout}
            navigateToLogin={navigateToLogin}
            navigateToMyOrders={navigateToMyOrders}
          />
          <main className="flex-grow container mx-auto px-4 py-8">
            {renderView()}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;