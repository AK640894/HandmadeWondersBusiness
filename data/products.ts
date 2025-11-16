import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Azure Teardrop Earrings',
    price: 1800,
    imageUrl: 'https://picsum.photos/seed/earring1/600/600',
    description: 'Elegant paper quilled teardrop earrings in shades of azure and sky blue. Lightweight and perfect for any occasion.',
    category: 'earrings',
    options: {
      name: 'Hook Material',
      values: ['Sterling Silver', 'Gold Plated', 'Hypoallergenic Steel'],
    },
  },
  {
    id: 2,
    name: 'Sunset Floral Earrings',
    price: 2000,
    imageUrl: 'https://picsum.photos/seed/earring2/600/600',
    description: 'Intricate floral design inspired by sunset colors. Handcrafted with precision and sealed for durability.',
    category: 'earrings',
    options: {
      name: 'Color',
      values: ['Blue/Yellow', 'Pink/Green', 'Orange/Purple'],
    },
  },
  {
    id: 3,
    name: 'Emerald Swirl Earrings',
    price: 1600,
    imageUrl: 'https://picsum.photos/seed/earring3/600/600',
    description: 'Vibrant green swirls create a mesmerizing effect. These earrings are lightweight, durable, and feature hypoallergenic hooks.',
    category: 'earrings',
  },
  {
    id: 4,
    name: 'Crimson Heart Studs',
    price: 1200,
    imageUrl: 'https://picsum.photos/seed/earring4/600/600',
    description: 'Simple yet beautiful heart-shaped studs in a deep crimson color. Perfect for a subtle touch of handmade charm.',
    category: 'earrings',
  },
  {
    id: 5,
    name: 'Sharma Family Nameplate',
    price: 3600,
    imageUrl: 'https://picsum.photos/seed/nameplate1/800/400',
    description: 'A beautiful, personalized nameplate for your home. Customize with your family name and get AI-powered design suggestions.',
    category: 'nameplates',
  },
  {
    id: 6,
    name: 'Kumar Modern Nameplate',
    price: 4000,
    imageUrl: 'https://picsum.photos/seed/nameplate2/800/400',
    description: 'A sleek and modern nameplate, perfect for contemporary homes. Use our Gemini-powered customizer to find the perfect style.',
    category: 'nameplates',
  },
];