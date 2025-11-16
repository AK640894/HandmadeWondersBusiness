import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleCustomizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onProductClick(product);
  };

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => onProductClick(product)}
    >
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-80">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.description.substring(0, 50)}...</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-medium text-gray-900 mb-2">₹{product.price.toLocaleString('en-IN')}</p>
          
          {product.category === 'earrings' && onAddToCart && (
            <button
              onClick={handleAddToCartClick}
              className={`relative z-10 w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-terracotta focus:ring-offset-2 ${
                isAdded 
                  ? 'bg-brand-sage text-white' 
                  : 'bg-brand-terracotta text-white hover:bg-brand-terracotta/90'
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {isAdded ? 'Added!' : 'Add to Cart'}
            </button>
          )}
          {product.category === 'nameplates' && (
            <button
              onClick={handleCustomizeClick}
              className="relative z-10 w-full rounded-md border border-transparent bg-brand-sage px-4 py-2 text-sm font-medium text-white hover:bg-brand-sage/90 focus:outline-none focus:ring-2 focus:ring-brand-sage focus:ring-offset-2"
              aria-label={`Customize ${product.name}`}
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
