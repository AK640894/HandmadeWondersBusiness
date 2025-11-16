import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { getDesignIdeas, DesignSuggestion } from '../services/geminiService';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { SparkleIcon } from '../components/Icon';

interface NameplateCustomizerPageProps {
  product: Product;
  navigateToHome: () => void;
}

const NameplateCustomizerPage: React.FC<NameplateCustomizerPageProps> = ({ product, navigateToHome }) => {
  const { addToCart } = useCart();
  const [name, setName] = useState('');
  const [stylePrompt, setStylePrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<DesignSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleGenerateIdeas = async () => {
    if (!name || !stylePrompt) {
      setError("Please enter both a name and a style description.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    try {
      const result = await getDesignIdeas(name, stylePrompt);
      setSuggestion(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    // In a real app, you'd save the customization details
    addToCart(product, 1, `Custom: ${name}`);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <div>
      <button onClick={navigateToHome} className="mb-8 text-sm font-medium text-brand-terracotta hover:text-brand-terracotta/80">
        &larr; Back to all products
      </button>

      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          <p className="text-3xl mt-2 text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="mt-4 text-base text-gray-600">{product.description}</p>
        </div>
      </div>

      {/* Customizer Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <SparkleIcon className="w-6 h-6 text-brand-terracotta" />
          Customize with Gemini AI
        </h2>
        <p className="mt-2 text-gray-600">Let our AI design assistant help you create the perfect nameplate.</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nameplate-name" className="block text-sm font-medium text-gray-700">Name to Display</label>
            <input
              type="text"
              id="nameplate-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sharma"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-sage focus:border-brand-sage"
            />
          </div>
          <div>
            <label htmlFor="style-prompt" className="block text-sm font-medium text-gray-700">Describe Your Desired Style</label>
            <input
              type="text"
              id="style-prompt"
              value={stylePrompt}
              onChange={(e) => setStylePrompt(e.target.value)}
              placeholder="e.g., Modern with a touch of nature"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-sage focus:border-brand-sage"
            />
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={handleGenerateIdeas} isLoading={isLoading}>
            Get Design Ideas
          </Button>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        
        {isLoading && <LoadingSpinner message="Generating creative ideas..." />}

        {suggestion && (
          <div className="mt-8 p-6 bg-brand-cream/50 rounded-lg border border-brand-sage/30 animate-fade-in">
            <h3 className="text-xl font-semibold text-brand-dark">Your AI Design Concept!</h3>
            <p className="mt-2 text-gray-700 italic">"{suggestion.description}"</p>
            <div className="mt-4">
              <p className="font-medium text-gray-800">Suggested Font:</p>
              <p className="text-2xl" style={{ fontFamily: suggestion.fontFamily, fontWeight: 700 }}>{name || "Sample Name"}</p>
              <p className="text-sm text-gray-500">({suggestion.fontFamily})</p>
            </div>
            <div className="mt-4">
              <p className="font-medium text-gray-800">Color Palette:</p>
              <div className="flex gap-2 mt-1">
                {suggestion.colorPalette.map((color, index) => (
                  <div key={index} className="w-10 h-10 rounded-full border border-gray-300" style={{ backgroundColor: color }}></div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 border-t pt-6">
            <Button onClick={handleAddToCart} variant="secondary">
                {addedMessage ? 'Added to Cart!' : 'Add Custom Nameplate to Cart'}
            </Button>
        </div>

      </div>
    </div>
  );
};

export default NameplateCustomizerPage;