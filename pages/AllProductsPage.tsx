import React from 'react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useCart } from '../hooks/useCart';

interface AllProductsPageProps {
  navigateToProduct: (product: Product) => void;
  navigateToHome: () => void;
}

const AllProductsPage: React.FC<AllProductsPageProps> = ({ navigateToProduct, navigateToHome }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    // This handler is only for earrings, as nameplates have a 'Customize' button
    if (product.category === 'earrings') {
      addToCart(product, 1, product.options?.values[0]);
    }
  };

  return (
    <div>
      <button onClick={navigateToHome} className="mb-8 text-sm font-medium text-brand-terracotta hover:text-brand-terracotta/80">
        &larr; Home
      </button>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Our Handicrafts</h1>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={navigateToProduct}
            onAddToCart={product.category === 'earrings' ? handleAddToCart : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
