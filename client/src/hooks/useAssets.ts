/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         LOVE OVER COFFEE - USE ASSETS HOOK                   ║
 * ║                                                                              ║
 * ║  This hook provides easy access to all assets from the central config.       ║
 * ║  Import this hook in any component to use images, videos, and other media.   ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * USAGE:
 * 
 * import { useAssets } from '@/hooks/useAssets';
 * 
 * function MyComponent() {
 *   const { stock, hero, gallery, menu, audio, links } = useAssets();
 *   
 *   return <img src={stock.cappuccino} alt="Cappuccino" />;
 * }
 */

import assets, {
  stockImages,
  heroAssets,
  galleryItems,
  mediaGalleryItems,
  menuHighlights,
  menuCategories,
  categoryImages,
  audioAssets,
  siteMetadata,
  externalLinks,
  drinkPortalConfig,
  type MediaItem,
} from '@/config/assets.config';

export interface AssetsHook {
  stock: typeof stockImages;
  hero: typeof heroAssets;
  gallery: typeof galleryItems;
  media: MediaItem[];
  menuHighlights: typeof menuHighlights;
  menuCategories: typeof menuCategories;
  categoryImages: typeof categoryImages;
  audio: typeof audioAssets;
  metadata: typeof siteMetadata;
  links: typeof externalLinks;
  drinkPortal: typeof drinkPortalConfig;
  all: typeof assets;
}

export function useAssets(): AssetsHook {
  return {
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
    all: assets,
  };
}

export { type MediaItem };

export default useAssets;
