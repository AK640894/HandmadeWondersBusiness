import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import Button from '../components/Button';

interface ProductPageProps {
  product: Product;
  navigateToHome: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, navigateToHome }) => {
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState<string>(product.options?.values[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <div>
       <button onClick={navigateToHome} className="mb-8 text-sm font-medium text-brand-terracotta hover:text-brand-terracotta/80">
        &larr; Back to all products
      </button>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          <p className="text-3xl mt-2 text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="mt-4 text-base text-gray-600">{product.description}</p>
          
          {product.options && (
            <div className="mt-6">
              <label htmlFor="option-select" className="block text-sm font-medium text-gray-700">{product.options.name}</label>
              <select
                id="option-select"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-sage focus:border-brand-sage sm:text-sm rounded-md"
              >
                {product.options.values.map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-6 flex items-center">
            <Button onClick={handleAddToCart} className="flex-1">
              {addedMessage ? 'Added!' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;