/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    LOVE OVER COFFEE - ASSET CONFIGURATION                    ║
 * ║                                                                              ║
 * ║  This is the CENTRAL configuration file for ALL assets in the application.  ║
 * ║  Edit this file to change images, videos, icons, audio, and other media.    ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════════════════
// STOCK IMAGES - Local images from attached_assets/stock_images/
// ═══════════════════════════════════════════════════════════════════════════════

import cappuccinoImg from '@assets/stock_images/cappuccino_coffee_la_5d8da662.jpg';
import biscoffImg from '@assets/stock_images/lotus_biscoff_coffee_f655c8f9.jpg';
import coldCoffeeImg from '@assets/stock_images/cold_coffee_frappe_i_ee6facc1.jpg';
import tiramisuImg from '@assets/stock_images/tiramisu_frappe_dess_c0c66dcb.jpg';
import fondueImg from '@assets/stock_images/cheese_fondue_melted_af7f6f6f.jpg';
import nachosImg from '@assets/stock_images/nachos_chips_cheese__98097898.jpg';
import lemonTeaImg from '@assets/stock_images/lemon_mint_iced_tea__7cea188e.jpg';
import darkChocoImg from '@assets/stock_images/dark_chocolate_frapp_fcba1bc6.jpg';
import mangoMojitoImg from '@assets/stock_images/mango_mojito_cocktai_8ca0446e.jpg';
import espressoImg from '@assets/stock_images/espresso_coffee_shot_9fabe213.jpg';
import pizzaImg from '@assets/stock_images/margarita_pizza_fres_656dfc76.jpg';
import sandwichImg from '@assets/stock_images/grilled_vegetable_sa_fc2be385.jpg';
import pastaImg from '@assets/stock_images/creamy_pasta_alfredo_fbd36371.jpg';
import friesImg from '@assets/stock_images/french_fries_golden__cef30441.jpg';
import shakeImg from '@assets/stock_images/oreo_milkshake_choco_037e89bc.jpg';
import garlicBreadImg from '@assets/stock_images/garlic_bread_cheese_9cd39aeb.jpg';
import premiumCoffeeImg from '@assets/stock_images/premium_artisan_coff_fde1e3a8.jpg';
import cafeStorefrontImg from '@assets/51_1764347957828.webp';

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTED STOCK IMAGES
// ═══════════════════════════════════════════════════════════════════════════════

export const stockImages = {
  cappuccino: cappuccinoImg,
  biscoff: biscoffImg,
  coldCoffee: coldCoffeeImg,
  tiramisu: tiramisuImg,
  fondue: fondueImg,
  nachos: nachosImg,
  lemonTea: lemonTeaImg,
  darkChoco: darkChocoImg,
  mangoMojito: mangoMojitoImg,
  espresso: espressoImg,
  pizza: pizzaImg,
  sandwich: sandwichImg,
  pasta: pastaImg,
  fries: friesImg,
  shake: shakeImg,
  garlicBread: garlicBreadImg,
  premiumCoffee: premiumCoffeeImg,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION ASSETS
// ═══════════════════════════════════════════════════════════════════════════════
// 
// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  🏠  USER EDITABLE: Home screen / Hero section settings                     │
// │                                                                             │
// │  mainImage: The main background image for the hero section                  │
// │  splineScene: 3D animated scene (optional - keep or remove)                 │
// │  title: The big text displayed on homepage                                  │
// │  tagline: Subtitle text under the main title                                │
// └─────────────────────────────────────────────────────────────────────────────┘

export const heroAssets = {
  mainImage: cafeStorefrontImg,  // <- EDIT: Replace with your hero image (import at top of file)
  splineScene: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",  // <- EDIT: 3D scene URL (optional)
  title: {
    line1: "LOVE",    // <- EDIT: First line of title
    line2: "OVER",    // <- EDIT: Second line of title
    line3: "COFFEE",  // <- EDIT: Third line of title
  },
  tagline: "Experience the perfect blend of premium flavors and cozy vibes",  // <- EDIT: Tagline
  badges: ["Premium", "Artisan", "Crafted"],  // <- EDIT: Badge labels
};

// ═══════════════════════════════════════════════════════════════════════════════
// GALLERY SECTION - Images shown in the specialty gallery
// ═══════════════════════════════════════════════════════════════════════════════
// 
// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  🖼️  USER EDITABLE: Replace these placeholder images with your own photos  │
// │                                                                             │
// │  HOW TO CHANGE:                                                             │
// │  1. Replace the 'src' URL with your own image URL                           │
// │  2. Or import a local image: import myImg from '@assets/stock_images/x.jpg' │
// │  3. Change 'title' and 'category' to match your content                     │
// │                                                                             │
// │  RECOMMENDED SIZE: 800x600px or larger, landscape orientation               │
// └─────────────────────────────────────────────────────────────────────────────┘

export const galleryItems = [
  { 
    id: 1, 
    title: "ARTISAN PIZZA",
    category: "Savory",
    src: pizzaImg  // High-quality margarita pizza image
  },
  { 
    id: 2, 
    title: "HOT COFFEE", 
    category: "Brew", 
    src: cappuccinoImg  // Cappuccino with latte art
  },
  { 
    id: 3, 
    title: "FRESH MOJITO", 
    category: "Refresh", 
    src: mangoMojitoImg  // Refreshing mojito drink
  },
  { 
    id: 4, 
    title: "CLUB SANDWICH", 
    category: "Snack", 
    src: sandwichImg  // Grilled vegetable sandwich
  },
  { 
    id: 5, 
    title: "COLD COFFEE", 
    category: "Chilled", 
    src: coldCoffeeImg  // Cold coffee frappe
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MEDIA GALLERY - Videos and images for the media carousel
// ═══════════════════════════════════════════════════════════════════════════════
// 
// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  🎬  USER EDITABLE: Replace these placeholder videos/images                 │
// │                                                                             │
// │  FOR VIDEOS:                                                                │
// │  1. Replace 'src' with your video URL (MP4 format recommended)              │
// │  2. Replace 'thumbnail' with a preview image URL                            │
// │  3. Set type: 'video'                                                       │
// │                                                                             │
// │  FOR IMAGES:                                                                │
// │  1. Replace 'src' with your image URL                                       │
// │  2. Set type: 'image'                                                       │
// │                                                                             │
// │  RECOMMENDED: Upload your own cafe/coffee shop photos and videos here!      │
// └─────────────────────────────────────────────────────────────────────────────┘

export interface MediaItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  thumbnail?: string;
  title?: string;
}

export const mediaGalleryItems: MediaItem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // VIDEO 1: Replace with your own cafe video
  // ──────────────────────────────────────────────────────────────────────────
  { 
    id: 1, 
    type: 'video', 
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',  // <- EDIT: Your video URL
    thumbnail: 'https://picsum.photos/seed/vid1/800/600',  // <- EDIT: Video thumbnail image
    title: 'Coffee Moments'  // <- EDIT: Video title
  },
  // ──────────────────────────────────────────────────────────────────────────
  // IMAGE 1: Replace with your cafe photo
  // ──────────────────────────────────────────────────────────────────────────
  { 
    id: 2, 
    type: 'image', 
    src: 'https://picsum.photos/seed/loc1/800/600',  // <- EDIT: Your image URL
    title: 'Coffee Moments 1' 
  },
  // ──────────────────────────────────────────────────────────────────────────
  // IMAGE 2: Replace with your cafe photo
  // ──────────────────────────────────────────────────────────────────────────
  { 
    id: 3, 
    type: 'image', 
    src: 'https://picsum.photos/seed/loc2/800/600',  // <- EDIT: Your image URL
    title: 'Coffee Moments 2' 
  },
  // ──────────────────────────────────────────────────────────────────────────
  // VIDEO 2: Replace with your own cafe video
  // ──────────────────────────────────────────────────────────────────────────
  { 
    id: 4, 
    type: 'video', 
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',  // <- EDIT: Your video URL
    thumbnail: 'https://picsum.photos/seed/vid2/800/600',  // <- EDIT: Video thumbnail image
    title: 'Cafe Vibes' 
  },
  // ──────────────────────────────────────────────────────────────────────────
  // IMAGES 3-6: Replace with your cafe/memory photos
  // ──────────────────────────────────────────────────────────────────────────
  { 
    id: 5, 
    type: 'image', 
    src: 'https://picsum.photos/seed/loc3/800/600',  // <- EDIT: Your image URL
    title: 'Coffee Moments 3' 
  },
  { 
    id: 6, 
    type: 'image', 
    src: 'https://picsum.photos/seed/loc4/800/600',  // <- EDIT: Your image URL
    title: 'Cafe Vibes 1' 
  },
  { 
    id: 7, 
    type: 'image', 
    src: 'https://picsum.photos/seed/loc5/800/600',  // <- EDIT: Your image URL
    title: 'Cafe Vibes 2' 
  },
  { 
    id: 8, 
    type: 'image', 
    src: 'https://picsum.photos/seed/loc6/800/600',  // <- EDIT: Your image URL
    title: 'Love Over Coffee' 
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MENU HIGHLIGHTS - Featured items shown at the top of the menu
// ═══════════════════════════════════════════════════════════════════════════════

export const menuHighlights = [
  { 
    id: 1, 
    name: "Cappuccino", 
    price: "₹160.00", 
    reviews: 9, 
    photos: 4, 
    src: cappuccinoImg, 
    color: "bg-amber-600", 
    gradient: "from-amber-600/40 to-orange-500/20", 
    description: "A shot of espresso with steamed milk and foam." 
  },
  { 
    id: 2, 
    name: "Lotus Biscoff Coffee", 
    price: "", 
    reviews: 1, 
    photos: 9, 
    src: biscoffImg, 
    color: "bg-orange-500", 
    gradient: "from-orange-500/40 to-amber-500/20", 
    description: "Tasty combination of cappuccino with caramelised taste of lotus biscoff." 
  },
  { 
    id: 3, 
    name: "Cold Coffee", 
    price: "", 
    reviews: 4, 
    photos: 1, 
    src: coldCoffeeImg, 
    color: "bg-blue-500", 
    gradient: "from-blue-500/40 to-indigo-500/20", 
    description: "Rich, creamy and irresistible cold coffee." 
  },
  { 
    id: 4, 
    name: "Tiramisu Frappe", 
    price: "₹240.00", 
    reviews: 3, 
    photos: 1, 
    src: tiramisuImg, 
    color: "bg-amber-700", 
    gradient: "from-amber-700/40 to-brown-500/20", 
    description: "Brownie chunks blended with amazing tiramisu flavour in cold coffee." 
  },
  { 
    id: 5, 
    name: "Cheese Fondue", 
    price: "", 
    reviews: 3, 
    photos: 1, 
    src: fondueImg, 
    color: "bg-yellow-500", 
    gradient: "from-yellow-500/40 to-orange-400/20", 
    description: "Bell pepper flavoured with indian spices, cheese and crispy finger bread." 
  },
  { 
    id: 6, 
    name: "Nachos", 
    price: "", 
    reviews: 0, 
    photos: 4, 
    src: nachosImg, 
    color: "bg-red-500", 
    gradient: "from-red-500/40 to-orange-500/20", 
    description: "Chefs special nachos with cheese and bell peppers." 
  },
  { 
    id: 7, 
    name: "Lemon Mint Ice Tea", 
    price: "₹160.00", 
    reviews: 0, 
    photos: 3, 
    src: lemonTeaImg, 
    color: "bg-green-500", 
    gradient: "from-green-500/40 to-lime-500/20", 
    description: "Refreshing lemon and mint flavored iced tea." 
  },
  { 
    id: 8, 
    name: "Dark Chocolate Frappe", 
    price: "₹200.00", 
    reviews: 1, 
    photos: 1, 
    src: darkChocoImg, 
    color: "bg-amber-900", 
    gradient: "from-amber-900/40 to-brown-600/20", 
    description: "Recommended to those who want combination of dark chocolate and frappe at the same time." 
  },
  { 
    id: 9, 
    name: "Mango Mojito", 
    price: "₹180.00", 
    reviews: 1, 
    photos: 1, 
    src: mangoMojitoImg, 
    color: "bg-yellow-400", 
    gradient: "from-yellow-400/40 to-orange-400/20", 
    description: "Mango, mint n lime. The perfect refresher." 
  },
  { 
    id: 10, 
    name: "Espresso", 
    price: "₹110.00", 
    reviews: 1, 
    photos: 1, 
    src: espressoImg, 
    color: "bg-amber-800", 
    gradient: "from-amber-800/40 to-brown-700/20", 
    description: "Full Flavoured Concentrated Foam Of Coffee." 
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MENU CATEGORIES - All menu items organized by category
// ═══════════════════════════════════════════════════════════════════════════════

export const menuCategories = [
  {
    id: 'coffee',
    name: 'Signature Brews',
    icon: 'Coffee',
    color: 'from-amber-700 to-orange-600',
    categoryImage: espressoImg,
    items: [
      { name: 'Espresso', description: 'Pure energy. Bold and intense.', price: '$3.50', img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&auto=format&fit=crop&q=80' },
      { name: 'Classic Cappuccino', description: 'Rich espresso with frothy milk foam.', price: '$4.50', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=80' },
      { name: 'Hazelnut Latte', description: 'Smooth milk with roasted hazelnut notes.', price: '$5.00', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop&q=80' },
      { name: 'Iced Mocha', description: 'Chilled chocolate coffee perfection.', price: '$5.50', img: 'https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?w=800&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'pizza',
    name: 'Artisan Pizzas',
    icon: 'Pizza',
    color: 'from-red-500 to-orange-500',
    categoryImage: pizzaImg,
    items: [
      { name: 'Margherita', description: 'Fresh basil, mozzarella, and san marzano tomato.', price: '$12.00', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80' },
      { name: 'Spicy Pepperoni', description: 'Crispy cups of pepperoni with chili flakes.', price: '$14.00', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=80' },
      { name: 'BBQ Chicken', description: 'Smoky BBQ sauce, onions, and grilled chicken.', price: '$15.00', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80' },
      { name: 'Garden Veggie', description: 'Loaded with bell peppers, olives, and mushrooms.', price: '$13.00', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'bites',
    name: 'Quick Bites',
    icon: 'Sandwich',
    color: 'from-yellow-500 to-amber-500',
    categoryImage: sandwichImg,
    items: [
      { name: 'Club Sandwich', description: 'Triple layered goodness with fresh veggies.', price: '$8.00', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80' },
      { name: 'Loaded Fries', description: 'Crispy fries topped with cheese and herbs.', price: '$6.00', img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&auto=format&fit=crop&q=80' },
      { name: 'Butter Croissant', description: 'Flaky, buttery, and freshly baked.', price: '$3.50', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80' },
      { name: 'NY Cheesecake', description: 'Creamy classic with a strawberry glaze.', price: '$6.00', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80' },
    ]
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORY IMAGES MAP - Quick reference for category thumbnails
// ═══════════════════════════════════════════════════════════════════════════════

export const categoryImages: Record<string, string> = {
  'coffee': espressoImg,
  'pizza': pizzaImg,
  'bites': sandwichImg,
};

// ═══════════════════════════════════════════════════════════════════════════════
// AUDIO ASSETS - Background music and sound effects
// ═══════════════════════════════════════════════════════════════════════════════

export const audioAssets = {
  backgroundMusic: "/song.mp4",
  defaultVolume: 0.2,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SITE METADATA - SEO and branding information
// ═══════════════════════════════════════════════════════════════════════════════

export const siteMetadata = {
  title: "Love Over Coffee - Premium Coffee Experience",
  description: "Experience the perfect blend of premium flavors and cozy vibes in a futuristic setting. Love Over Coffee - where passion meets perfection.",
  favicon: "/favicon.png",
  ogImage: premiumCoffeeImg,
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXTERNAL LINKS - Partner sites and social media
// ═══════════════════════════════════════════════════════════════════════════════

export const externalLinks = {
  legacySite: "https://loveovercoffee.pages.dev",
  drinkZoi: "https://drinkzoi.co",
  instagram: "#",
  facebook: "#",
  twitter: "#",
};

// ═══════════════════════════════════════════════════════════════════════════════
// DRINK PORTAL CONFIGURATION - "Time Travel to 2024" portal settings
// ═══════════════════════════════════════════════════════════════════════════════

export const drinkPortalConfig = {
  title: "Time Travel to 2024",
  subtitle: "Visit our legacy experience",
  targetUrl: "https://loveovercoffee.pages.dev",
  buttonText: "Enter Portal",
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT ALL ASSETS
// ═══════════════════════════════════════════════════════════════════════════════

export const assets = {
  stock: stockImages,
  hero: heroAssets,
  gallery: galleryItems,
  media: mediaGalleryItems,
  menuHighlights,
  menuCategories,
  categoryImages,
  audio: audioAssets,
  metadata: siteMetadata,
  links: externalLinks,
  drinkPortal: drinkPortalConfig,
};

export default assets;
