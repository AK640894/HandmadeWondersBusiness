import React, { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { generateImage } from '../services/geminiService';
import { SparkleIcon } from '../components/Icon';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../hooks/useCart';

interface HomePageProps {
  navigateToProduct: (product: Product) => void;
  navigateToAllProducts: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateToProduct, navigateToAllProducts }) => {
  const { addToCart } = useCart();
  const earrings = products.filter(p => p.category === 'earrings').slice(0, 4);
  const nameplates = products.filter(p => p.category === 'nameplates').slice(0, 2);

  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [aiItemAdded, setAiItemAdded] = useState(false);

  const suggestions = [
    "Paper quilled earrings shaped like sunflowers",
    "A nameplate with 'Welcome' decorated with quilled autumn leaves",
    "Delicate paper quilled snowflake earrings in blue and white",
    "Paper quilled peacock feather earrings",
    "A nameplate with 'The Patels' surrounded by colorful quilled flowers",
    "Abstract quilled earrings with a vortex pattern",
  ];

  const handleGenerateImage = async () => {
    if (!aiPrompt.trim()) {
      setGenerationError("Please enter a description for your design.");
      return;
    }
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedImage(null);
    setAiItemAdded(false);
    try {
      const base64Data = await generateImage(aiPrompt);
      const imageUrl = `data:image/png;base64,${base64Data}`;
      setGeneratedImage(imageUrl);
    } catch (err) {
      setGenerationError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAiPrompt(suggestion);
  };
  
  const handleAddAiItemToCart = () => {
    if (!generatedImage) return;

    const aiProduct: Product = {
      id: Date.now(),
      name: 'AI Generated Custom Design',
      price: 500,
      imageUrl: generatedImage,
      description: `Custom design based on prompt: "${aiPrompt}"`,
      category: 'earrings',
    };
    
    addToCart(aiProduct, 1);
    setAiItemAdded(true);
    setTimeout(() => setAiItemAdded(false), 2000);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1, product.options?.values[0]);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden bg-gray-900 shadow-xl h-96 flex items-center justify-center text-center p-4">
        <img
          src="https://picsum.photos/seed/hero/1200/400"
          alt="Paper quilled earrings"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
            Art You Can Wear.
          </h1>
          <p className="mt-4 text-xl text-gray-200">Crafted with Care.</p>
        </div>
      </div>

      {/* Featured Earrings */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Earrings</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {earrings.map(product => (
            <ProductCard key={product.id} product={product} onProductClick={navigateToProduct} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* Featured Nameplates */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Custom Nameplates</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
          {nameplates.map(product => (
            <ProductCard key={product.id} product={product} onProductClick={navigateToProduct} />
          ))}
        </div>
      </section>
      
      {/* AI Image Generation Section */}
      <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <SparkleIcon className="w-6 h-6 text-brand-terracotta" />
          Imagine & Create with AI
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Not sure what you want? Describe your ideal paper-quilled item and let our AI create a visual concept for you!</p>
        
        <div className="mt-6 max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g., Delicate paper quilled earrings like hummingbirds"
            className="flex-grow block w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-sage focus:border-brand-sage"
          />
           <Button onClick={handleGenerateImage} isLoading={isGenerating}>
            Generate Image
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-sm text-brand-terracotta bg-brand-terracotta/10 rounded-full hover:bg-brand-terracotta/20 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        <div className="mt-8 min-h-[300px] flex items-center justify-center bg-gray-100 rounded-lg p-4">
          {isGenerating && <LoadingSpinner message="Creating your design..." />}
          {generationError && <p className="text-red-600">{generationError}</p>}
          {generatedImage && (
            <div className="text-center animate-fade-in flex flex-col items-center gap-4">
              <img 
                src={generatedImage} 
                alt="AI generated design" 
                className="max-w-full max-h-[400px] h-auto rounded-lg shadow-md"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">Custom AI Design</p>
                <p className="text-2xl font-bold text-brand-dark">₹500</p>
                <Button onClick={handleAddAiItemToCart} className="mt-2">
                  {aiItemAdded ? 'Added!' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          )}
          {!isGenerating && !generationError && !generatedImage && (
            <p className="text-gray-500">Your generated image will appear here.</p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Button onClick={navigateToAllProducts} variant="primary" className="px-8 py-4 text-lg">
          Shop All Handicrafts
        </Button>
      </section>
    </div>
  );
};

export default HomePage;