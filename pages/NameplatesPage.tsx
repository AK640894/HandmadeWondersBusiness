import React from 'react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface NameplatesPageProps {
  navigateToProduct: (product: Product) => void;
  navigateToHome: () => void;
}

const NameplatesPage: React.FC<NameplatesPageProps> = ({ navigateToProduct, navigateToHome }) => {
  const nameplates = products.filter(p => p.category === 'nameplates');

  return (
    <div>
      <button onClick={navigateToHome} className="mb-8 text-sm font-medium text-brand-terracotta hover:text-brand-terracotta/80">
        &larr; Home
      </button>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Custom Nameplates</h1>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
        {nameplates.map(product => (
          <ProductCard key={product.id} product={product} onProductClick={navigateToProduct} />
        ))}
      </div>
    </div>
  );
};

export default NameplatesPage;
