import React from 'react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useCart } from '../hooks/useCart';

interface EarringsPageProps {
  navigateToProduct: (product: Product) => void;
  navigateToHome: () => void;
}

const EarringsPage: React.FC<EarringsPageProps> = ({ navigateToProduct, navigateToHome }) => {
  const earrings = products.filter(p => p.category === 'earrings');
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1, product.options?.values[0]);
  };

  return (
    <div>
      <button onClick={navigateToHome} className="mb-8 text-sm font-medium text-brand-terracotta hover:text-brand-terracotta/80">
        &larr; Home
      </button>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Handmade Earrings</h1>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {earrings.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={navigateToProduct}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default EarringsPage;
