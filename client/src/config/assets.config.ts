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
  mainImage: premiumCoffeeImg,  // <- EDIT: Replace with your hero image (import at top of file)
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
    id: 'coffee-black',
    name: 'Coffee (Without Milk)',
    icon: 'Coffee',
    color: 'from-amber-900 to-amber-700',
    categoryImage: espressoImg,
    items: [
      { name: 'Americano', description: 'Espresso shot brewed with hot water.', price: '₹150.00', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop' },
      { name: 'Espresso', description: 'Full Flavoured Concentrated Foam Of Coffee.', price: '₹110.00', img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&auto=format&fit=crop' },
      { name: 'Iced Americano', description: 'Espresso shot combined with water and chilled with ice.', price: '₹170.00', img: 'https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?w=400&auto=format&fit=crop' },
      { name: 'Irish Americano', description: 'Espresso shot combined with hot water mixed with Irish syrup.', price: '₹180.00', img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'coffee-hot',
    name: 'Hot Coffee (With Milk)',
    icon: 'Coffee',
    color: 'from-amber-700 to-orange-600',
    categoryImage: cappuccinoImg,
    items: [
      { name: 'Biscoff Cappuccino', description: 'Tasty combination of cappuccino with caramelised taste of lotus biscoff.', price: '₹190.00', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop' },
      { name: 'Cafe Latte', description: 'A shot of espresso with steamed milk and a small layer of foam.', price: '₹170.00', img: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&auto=format&fit=crop' },
      { name: 'Cafe Mocha', description: 'A combination of rich espresso with chocolate sauce and steamed milk.', price: '₹190.00', img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&auto=format&fit=crop' },
      { name: 'Cappuccino', description: 'A shot of espresso with steamed milk and foam.', price: '₹160.00', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&auto=format&fit=crop' },
      { name: 'Flat White', description: 'Another version of cafe latte, espresso shot with steamed milk layered with very thin micro foam.', price: '₹170.00', img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&auto=format&fit=crop' },
      { name: 'Hot Chocolate', description: 'This sinful brew is a blend of dark chocolate with hot milk.', price: '₹180.00', img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&auto=format&fit=crop' },
      { name: 'Signature Hot Chocolate', description: 'Hot chocolate with the combination of hazelnut flavour.', price: '₹200.00', img: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'signature',
    name: 'Signature Drinks',
    icon: 'GlassWater',
    color: 'from-purple-600 to-indigo-600',
    categoryImage: biscoffImg,
    items: [
      { name: 'Cold Brew', description: 'Black - a delicate & complete drink.', price: '₹190.00', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop' },
      { name: 'Condensed Latte', description: 'Espresso with condensed.', price: '₹200.00', img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&auto=format&fit=crop' },
      { name: 'Cranberry Cold Brew', description: 'Cranberry with cold brew.', price: '₹240.00', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop' },
      { name: 'Vietnamese', description: 'Espresso, condensed, ice.', price: '₹220.00', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'ice-tea',
    name: 'Ice Teas',
    icon: 'GlassWater',
    color: 'from-green-500 to-teal-500',
    categoryImage: lemonTeaImg,
    items: [
      { name: 'Blueberry Ice Tea', description: 'Refreshing blueberry flavored iced tea.', price: '₹200.00', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop' },
      { name: 'Lemon Mint Ice Tea', description: 'Classic lemon mint refresher.', price: '₹160.00', img: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&auto=format&fit=crop' },
      { name: 'Peach Ice Tea', description: 'Sweet peach flavored iced tea.', price: '₹180.00', img: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400&auto=format&fit=crop' },
      { name: 'Strawberry Ice Tea', description: 'Fresh strawberry iced tea.', price: '₹180.00', img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    icon: 'Coffee',
    color: 'from-blue-600 to-cyan-500',
    categoryImage: coldCoffeeImg,
    items: [
      { name: 'Cafe Frappe', description: 'Rich, creamy and irresistable cold coffee.', price: '₹190.00', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop' },
      { name: 'Caramel Creamy Frappe', description: 'Cafe frappe with the combination of caramel flavour.', price: '₹210.00', img: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=400&auto=format&fit=crop' },
      { name: 'Choco Frappe', description: 'Cafe frappe with combination of chocolate fudge.', price: '₹200.00', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop' },
      { name: 'Dark Chocolate Frappe', description: 'Dark chocolate and frappe combination.', price: '₹200.00', img: 'https://images.unsplash.com/photo-1579888944880-d98341245702?w=400&auto=format&fit=crop' },
      { name: 'Oreo Frappe', description: 'Oreo cookies blended with ice cream n espresso shot.', price: '₹220.00', img: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&auto=format&fit=crop' },
      { name: 'Tiramisu Frappe', description: 'Brownie chunks blended with amazing tiramisu flavour.', price: '₹240.00', img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    icon: 'GlassWater',
    color: 'from-pink-500 to-rose-500',
    categoryImage: mangoMojitoImg,
    items: [
      { name: 'Mango Mojito', description: 'Mango, mint n lime. The perfect refresher.', price: '₹180.00', img: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&auto=format&fit=crop' },
      { name: 'Virgin Mojito', description: 'Refreshing chilled mint mojito.', price: '₹170.00', img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&auto=format&fit=crop' },
      { name: 'Cranberry Mojito', description: 'Crisp, clean taste of cranberry with lemon n ice.', price: '₹200.00', img: 'https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=400&auto=format&fit=crop' },
      { name: 'Watermelon Punch', description: 'Watermelon refreshing drink.', price: '₹180.00', img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'shakes',
    name: 'Shakes',
    icon: 'IceCream',
    color: 'from-pink-400 to-purple-500',
    categoryImage: shakeImg,
    items: [
      { name: 'Oreo Shake', description: 'You Want Oreo? We Got Oreo.', price: '₹220.00', img: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&auto=format&fit=crop' },
      { name: 'Nutella Shake', description: 'For the nutella lovers.', price: '₹280.00', img: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400&auto=format&fit=crop' },
      { name: 'Dark Chocolate Shake', description: 'As chocolaty as it can get!', price: '₹190.00', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop' },
      { name: 'Strawberry Shake', description: 'The strawberry shake that you deserve.', price: '₹200.00', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: 'Pizza',
    color: 'from-red-500 to-orange-500',
    categoryImage: pizzaImg,
    items: [
      { name: 'Classic Margarita Pizza', description: 'Classic Margarita with Mozzarella.', price: '₹310.00', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop' },
      { name: 'Farm Fresh Pizza', description: 'Onion, tomato and capsicum with mozzarella.', price: '₹330.00', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop' },
      { name: 'Tandoori Paneer Pizza', description: 'Cottage cheese, onion, capsicum with tandoori mayo.', price: '₹420.00', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&auto=format&fit=crop' },
      { name: 'Supreme Pizza', description: 'Green chilli, onion, tomato, capsicum, paneer.', price: '₹410.00', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    icon: 'Sandwich',
    color: 'from-yellow-500 to-amber-500',
    categoryImage: sandwichImg,
    items: [
      { name: 'Veg Club Sandwich', description: 'Fresh Lettuce, Coleslaw, Onion, Tomato.', price: '₹260.00', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&auto=format&fit=crop' },
      { name: 'Cheese Corn Sandwich', description: 'A combination of cheese n corn.', price: '₹220.00', img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&auto=format&fit=crop' },
      { name: 'Tandoori Paneer Sandwich', description: 'Paneer is an emotion.', price: '₹270.00', img: 'https://images.unsplash.com/photo-1481070555726-e2fe8357571d?w=400&auto=format&fit=crop' },
      { name: 'Triple Cheese Sandwich', description: 'Loaded with cheese.', price: '₹320.00', img: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'pasta',
    name: 'Pasta',
    icon: 'Utensils',
    color: 'from-orange-400 to-red-400',
    categoryImage: pastaImg,
    items: [
      { name: 'Alfredo Pasta (White)', description: 'Creamy sauce with parmesan cheese.', price: '₹400.00', img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&auto=format&fit=crop' },
      { name: 'Penne Arrabiata (Red)', description: 'Spicy fresh tomato sauce.', price: '₹370.00', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&auto=format&fit=crop' },
      { name: 'Penne Pink Sauce', description: 'Silky smooth decadent white sauce.', price: '₹420.00', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'fries',
    name: 'Loaded Fries',
    icon: 'Utensils',
    color: 'from-yellow-400 to-orange-400',
    categoryImage: friesImg,
    items: [
      { name: 'French Fries', description: "Fries before guys kind.", price: '₹170.00', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop' },
      { name: 'Peri Peri Fries', description: 'With peri peri spices.', price: '₹220.00', img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&auto=format&fit=crop' },
      { name: 'Cheese Jalapeno Fries', description: 'With cheese and jalapeno.', price: '₹240.00', img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'garlic-bread',
    name: 'Garlic Bread',
    icon: 'Utensils',
    color: 'from-amber-400 to-yellow-500',
    categoryImage: garlicBreadImg,
    items: [
      { name: 'Cheese Garlic Bread', description: 'Cheese blend, garlic and butter.', price: '₹220.00', img: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&auto=format&fit=crop' },
      { name: 'Chili Corn Garlic Bread', description: 'Cheese blend, corn, green chili.', price: '₹250.00', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop' },
      { name: 'OTC Garlic Bread', description: 'Onion, tomato, capsicum with spices.', price: '₹300.00', img: 'https://images.unsplash.com/photo-1432457990754-c8b5f21f969c?w=400&auto=format&fit=crop' },
    ]
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORY IMAGES MAP - Quick reference for category thumbnails
// ═══════════════════════════════════════════════════════════════════════════════

export const categoryImages: Record<string, string> = {
  'coffee-black': espressoImg,
  'coffee-hot': cappuccinoImg,
  'signature': biscoffImg,
  'ice-tea': lemonTeaImg,
  'cold-coffee': coldCoffeeImg,
  'mocktails': mangoMojitoImg,
  'shakes': shakeImg,
  'pizza': pizzaImg,
  'sandwiches': sandwichImg,
  'pasta': pastaImg,
  'fries': friesImg,
  'garlic-bread': garlicBreadImg,
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
