import React from 'react';
import { SparkleIcon } from '../components/Icon';

interface AboutPageProps {
  navigateToHome: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ navigateToHome }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <button onClick={navigateToHome} className="mb-8 text-sm font-medium text-brand-terracotta hover:text-brand-terracotta/80">
        &larr; Home
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center">
            <SparkleIcon className="w-12 h-12 text-brand-terracotta mx-auto" />
            <h1 className="mt-4 text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">
                The Heart of Handmade
            </h1>
            <p className="mt-6 text-xl text-gray-600">
                Welcome to Handmade Wonders, where every piece tells a story of passion, patience, and precision.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-2xl font-bold text-brand-dark">Our Story</h2>
                <p className="mt-4 text-gray-700">
                    Handmade Wonders began not in a workshop, but from a simple love for creating beauty out of paper. What started as a hobby – twisting, rolling, and gluing tiny strips of paper into intricate designs – blossomed into a full-fledged passion. We believe that in a world of mass production, there's a special magic in items that are made by hand, infused with the artisan's touch.
                </p>
                <p className="mt-4 text-gray-700">
                    Our mission is to share this magic with you, offering unique, handcrafted pieces that bring a touch of elegance and personality to your life and home.
                </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
                 <img
                    src="https://picsum.photos/seed/artisan/600/700"
                    alt="Artisan working on a craft"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

        <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-brand-dark">Our Craft & Commitment</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-brand-cream/50 rounded-lg">
                    <h3 className="font-semibold text-lg text-brand-dark">Quality Materials</h3>
                    <p className="mt-2 text-gray-600">We source the finest quality paper and materials, ensuring each creation is not only beautiful but also durable and long-lasting.</p>
                </div>
                 <div className="p-6 bg-brand-cream/50 rounded-lg">
                    <h3 className="font-semibold text-lg text-brand-dark">Meticulous Detail</h3>
                    <p className="mt-2 text-gray-600">Paper quilling is an art of patience. Every swirl, coil, and flourish is crafted with meticulous attention to detail.</p>
                </div>
                 <div className="p-6 bg-brand-cream/50 rounded-lg">
                    <h3 className="font-semibold text-lg text-brand-dark">Sustainable Practice</h3>
                    <p className="mt-2 text-gray-600">We are committed to eco-friendly practices, using recycled and sustainable materials wherever possible to protect our planet.</p>
                </div>
            </div>
        </div>
        
        <div className="mt-16 text-center">
             <h2 className="text-2xl font-bold text-brand-dark">Get in Touch</h2>
             <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
                Have a question or a custom request? We'd love to hear from you. Reach out to us and let's create something wonderful together.
             </p>
             <p className="mt-4 font-semibold text-brand-terracotta">
                contact@handmadewonders.com
             </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
