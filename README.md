# Love Over Coffee 2025 - Complete Guide

A premium coffee shop website with stunning 3D animations, smooth transitions, and award-winning design.

---

## Quick Start: Where to Edit Assets

**ONE FILE controls ALL images, videos, and media:**

```
client/src/config/assets.config.ts
```

Open this file to change any visual content on the website.

---

## What You Can Edit

### 1. Hero Section (Home Screen)

**Location in file:** Look for `heroAssets`

```javascript
export const heroAssets = {
  mainImage: premiumCoffeeImg,  // <- Your main hero background image
  title: {
    line1: "LOVE",    // <- First word
    line2: "OVER",    // <- Second word
    line3: "COFFEE",  // <- Third word
  },
  tagline: "Experience the perfect blend...",  // <- Subtitle text
};
```

**To change the hero image:**
1. Add your image to `attached_assets/stock_images/`
2. Import it at the top of the file:
   ```javascript
   import myHeroImage from '@assets/stock_images/my-hero.jpg';
   ```
3. Replace `premiumCoffeeImg` with `myHeroImage`

---

### 2. Gallery Section (Homepage Specialty Gallery)

**Location in file:** Look for `galleryItems`

This is the interactive gallery that shows coffee/food images with hover effects.

```javascript
export const galleryItems = [
  { 
    id: 1, 
    title: "ARTISAN PIZZA",     // <- Display name
    category: "Savory",          // <- Category label
    src: "https://..."           // <- IMAGE URL (change this!)
  },
  // ... more items
];
```

**To add your own gallery images:**
- Replace the `src` URL with your image URL
- Or import a local image and use it

---

### 3. Media Gallery (Videos & Memories)

**Location in file:** Look for `mediaGalleryItems`

This section displays your cafe videos and memory photos.

```javascript
export const mediaGalleryItems = [
  // VIDEO ITEM
  { 
    id: 1, 
    type: 'video',                    // <- 'video' or 'image'
    src: 'https://your-video.mp4',    // <- Video URL
    thumbnail: 'https://preview.jpg', // <- Preview image
    title: 'Coffee Moments'           // <- Title
  },
  // IMAGE ITEM
  { 
    id: 2, 
    type: 'image',
    src: 'https://your-photo.jpg',    // <- Image URL
    title: 'Cafe Vibes'
  },
];
```

**Currently using placeholder images - Replace with your own!**

---

### 4. Menu Items

**Location in file:** Look for `menuCategories`

Each menu category contains items with images:

```javascript
{
  id: 'coffee-hot',
  name: 'Hot Coffee (With Milk)',
  items: [
    { 
      name: 'Cappuccino',           // <- Item name
      description: '...',           // <- Description
      price: '₹160.00',             // <- Price
      img: 'https://...'            // <- Item image URL
    },
  ]
}
```

**Menu images are already set up with matching food photos!**

---

### 5. Background Music

**Location in file:** Look for `audioAssets`

```javascript
export const audioAssets = {
  backgroundMusic: "/song.mp4",  // <- Your music file
  defaultVolume: 0.2,
};
```

**To change the music:**
1. Add your audio file to the `public/` folder
2. Update the path: `backgroundMusic: "/your-song.mp3"`

---

## How to Add Local Images

### Step 1: Add your image file
Place your image in:
```
attached_assets/stock_images/your-image.jpg
```

### Step 2: Import the image
At the top of `assets.config.ts`, add:
```javascript
import myImage from '@assets/stock_images/your-image.jpg';
```

### Step 3: Use the image
Replace any image URL with your imported variable:
```javascript
src: myImage  // instead of src: "https://..."
```

---

## Using External Image URLs

You can also use images from the internet:

```javascript
src: "https://images.unsplash.com/photo-xxxxx?w=800"
```

**Recommended image sources:**
- Unsplash (free high-quality images)
- Your own hosted images
- Cloud storage links (Google Drive, Dropbox)

---

## File Structure

```
attached_assets/
  └── stock_images/          <- Add your local images here
      ├── cappuccino.jpg
      ├── espresso.jpg
      └── your-new-image.jpg

client/
  └── src/
      └── config/
          └── assets.config.ts   <- MAIN FILE TO EDIT

public/
  ├── favicon.png            <- Site icon
  └── song.mp4               <- Background music
```

---

## Current Placeholder Images

The following sections currently use **placeholder images** that you should replace:

| Section | What to Replace |
|---------|-----------------|
| Media Gallery Videos | Sample videos from Google |
| Media Gallery Images | Random images from picsum.photos |
| Gallery Section | Some Unsplash stock images |

**Menu images are already set with proper food photos matching each dish!**

---

## Recommended Image Sizes

| Section | Recommended Size |
|---------|------------------|
| Hero Image | 1920x1080 or larger |
| Gallery Images | 800x600 |
| Menu Item Images | 400x400 |
| Video Thumbnails | 800x600 |

---

## Quick Reference Card

| Want to change... | Edit this in assets.config.ts |
|-------------------|------------------------------|
| Homepage hero image | `heroAssets.mainImage` |
| Homepage title text | `heroAssets.title` |
| Gallery images | `galleryItems[].src` |
| Videos | `mediaGalleryItems[].src` |
| Menu item images | `menuCategories[].items[].img` |
| Background music | `audioAssets.backgroundMusic` |

---

## Tech Stack

- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS + Framer Motion
- **3D Graphics:** Spline (lazy-loaded for performance)
- **Smooth Scrolling:** Lenis (desktop only)
- **Routing:** React Router DOM with liquid curtain transitions

## Performance Features

- Adaptive Graphics Engine (HIGH/MEDIUM/LOW tiers)
- Lazy loading for images and 3D content
- GPU-accelerated animations
- Mobile-optimized experience

---

## Need Help?

1. Open `client/src/config/assets.config.ts`
2. Look for the section you want to edit (marked with comments)
3. Replace the URL or import with your own image
4. Save the file - changes appear automatically!

Happy customizing!
