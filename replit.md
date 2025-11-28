# Love Over Coffee - Premium Coffee Shop Website

## Overview

Love Over Coffee is a premium coffee shop website built with React, TypeScript, and modern web technologies. The application features immersive 3D animations, smooth page transitions, and a sophisticated dark-themed design inspired by high-end digital experiences. The site showcases coffee, food, and beverage offerings through an award-winning animated interface with dedicated pages for home and menu exploration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- React Router DOM for client-side routing and navigation
- Tailwind CSS for utility-first styling with custom design system

**Component Structure**
- Modular component architecture with separation between UI primitives (shadcn/ui) and feature components
- Page-based routing with dedicated route components (`HomePage`, `MenuPage`)
- Reusable UI components library based on Radix UI primitives with custom styling

**Animation & Interaction**
- Framer Motion for declarative animations and page transitions
- Spline for 3D scene integration with lazy loading for performance
- Lenis for smooth scrolling experiences
- Custom page transition system with liquid curtain effects between routes

**State Management**
- React Query (TanStack Query) for server state management and data fetching
- Local component state with React hooks for UI interactions
- Custom hooks for mobile detection and toast notifications

**Design System**
- Custom Tailwind configuration with extended color palette and spacing
- CSS variables for theme customization (light/dark mode support)
- Typography system featuring Titan One for headings and DM Sans for body text
- Glassmorphism and gradient effects for premium aesthetic

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- HTTP server creation for WebSocket support capability
- Middleware for JSON parsing and URL encoding
- Custom logging utility for request/response tracking

**API Structure**
- RESTful API design with `/api` prefix for all endpoints
- Route registration system through centralized `registerRoutes` function
- Static file serving for production builds
- Development mode with Vite middleware integration

**Storage Layer**
- In-memory storage implementation (`MemStorage`) as the default storage interface
- Abstracted storage interface (`IStorage`) for future database integration
- User management methods (CRUD operations)
- Drizzle ORM configured for PostgreSQL migration support

**Build System**
- Dual build process: client (Vite) and server (esbuild)
- Server bundling with selective dependency externalization
- Production-optimized builds with tree shaking
- Hot module replacement in development

### External Dependencies

**3D Graphics & Animation**
- Spline (`@splinetool/react-spline`, `@splinetool/runtime`) - 3D scene rendering and interactive animations
- Lenis (`@studio-freight/react-lenis`) - Smooth scroll library for premium scrolling experiences

**UI Component Library**
- Radix UI - Accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- shadcn/ui component system built on Radix with Tailwind styling
- Lucide React - Icon library for consistent iconography

**Form & Validation**
- React Hook Form with Hookform Resolvers for form state management
- Zod for schema validation
- Drizzle-Zod for database schema to validation schema conversion

**Database & ORM**
- Drizzle ORM - Type-safe ORM with PostgreSQL dialect
- Neon Serverless (`@neondatabase/serverless`) - Serverless PostgreSQL driver
- Drizzle Kit for schema migrations

**Styling & Utilities**
- Tailwind CSS - Utility-first CSS framework
- Class Variance Authority - Type-safe variant styling
- clsx & tailwind-merge - Conditional class name utilities
- PostCSS with Autoprefixer for CSS processing

**Development Tools**
- Replit-specific plugins for development environment integration
- TypeScript for static type checking across client and server
- ESBuild for fast server bundling

**Session & Storage**
- Express Session with connect-pg-simple for session storage (configured but not actively used)
- Memorystore as fallback session store

**Notes on Database**
- Drizzle is configured with PostgreSQL dialect but the application currently uses in-memory storage
- Schema defined in `shared/schema.ts` with users table structure
- Migration path prepared for future PostgreSQL integration via Neon or other providers

## Performance Optimizations

### Adaptive Graphics Engine (`usePerformanceMode` hook)
- **Tier System**: HIGH / MEDIUM / LOW based on device capabilities
- **Detection Criteria**:
  - `navigator.hardwareConcurrency` (CPU cores < 4 = LOW)
  - `navigator.deviceMemory` (RAM < 4GB = LOW)
  - `navigator.connection.saveData` (Data Saver = LOW)
  - `window.matchMedia('(max-width: 768px)')` (Mobile = LOW)
- **Returns**: `{ tier, show3D, enableBlur, enableLenis, isMobile, ... }`

### Conditional Rendering Strategy
- **LOW Tier / Mobile**: Static fallback images, no 3D, no Lenis, native scroll
- **HIGH Tier / Desktop**: Full 3D Spline, Lenis smooth scroll, all animations
- StaticHeroSection shows floating gradient fallback (0kb 3D assets)
- 3D Spline lazy-loaded with React.lazy() + Suspense

### Lenis Scroll Engine
- **Desktop Only**: Butter-smooth scroll with lerp: 0.04, duration: 1.8
- **Mobile**: Native browser scrolling (always smoother on phones)
- Conditionally disabled based on `usePerformanceMode().enableLenis`

### CSS Performance Optimizations
- `.gpu-layer` class: translate3d(0,0,0), backface-visibility, perspective
- Mobile removes ALL backdrop-filter (blur kills FPS)
- Mobile removes heavy box-shadows
- `content-visibility: auto` on sections (lazy render)
- `contain: strict` on gallery items (isolated paint)
- Data attributes: `[data-performance-tier]`, `[data-is-mobile]`

### Mobile Specific Overrides
```css
@media (max-width: 768px) {
  backdrop-filter: none !important;
  box-shadow: simplified !important;
  animation: disabled for heavy effects !important;
  transition-duration: 0.1s !important;
}
```

## Adding Your Own Hero Image

To replace the placeholder coffee image in the "Premium Coffee Experience" area:

1. Add your image file to the project (name it `1.jpg` or `1.png`)
2. Open `client/src/components/HeroSection.tsx`
3. Replace this line:
   ```typescript
   import placeholderCoffee from '@assets/stock_images/premium_artisan_coff_fde1e3a8.jpg';
   ```
   With:
   ```typescript
   import placeholderCoffee from '@assets/HOME/1.jpg'; // or .png
   ```

## WebGL Cloth Wave Video Player

The site features a premium WebGL video player inspired by Lusion.co with a cloth/flag waving animation effect.

### Components
- `WavingVideo.tsx` - Three.js mesh with custom GLSL shaders for cloth wave effect
- `VideoModal.tsx` - Full-screen modal with WebGL canvas, controls, and error handling

### Features
- **Cloth Wave Animation**: Custom vertex shader creates realistic fabric wave movement
- **Mouse Interaction**: Video tilts subtly following mouse position
- **Entry Animation**: Starts with wild waving, calms down to stable over 2 seconds
- **Hover Effect**: Gentle wave animation restarts when hovering over the video
- **Performance Optimized**: Uses refs instead of state for animation loop (no React reconciliation overhead)
- **Graceful Fallback**: WebGLErrorBoundary catches runtime failures, falls back to HTML5 video player

### Usage
Click the expand button (with "CLOTH WAVE" badge) on any video in the Media Gallery to open the WebGL player.

### Technical Details
- Uses `@react-three/fiber` for React integration with Three.js
- Uses `@react-three/drei` for video texture loading
- Shader uniforms: uTime, uAmplitude, uMouse, uTexture, uOpacity
- 64x36 segment plane geometry for smooth wave deformation
- Fallback HTML5 video player for devices without WebGL support

## Global Background Music Player

The site features a global background music player that persists across all pages.

### Component
- `BackgroundAudio.tsx` - Fixed position glassmorphic button in bottom-left corner

### Features
- **Audio Source**: Uses `/song.mp4` (video hidden, audio only)
- **Glassmorphic Button**: Translucent glass effect with backdrop blur
- **Mute Toggle**: Click to toggle between muted/playing states
- **Visual Feedback**: Spinning ring + pulse animation when playing
- **Browser Auto-Play Policy**: Starts muted, enables on first user click anywhere on the page
- **Global**: Persists across all pages (added to App.tsx)

### Usage
1. Place your audio file as `public/song.mp4`
2. The button appears in the bottom-left corner
3. Click anywhere on the page to enable audio (browser policy)
4. Click the button to toggle mute/unmute

## Recent Changes

**November 28, 2025 - Global Background Music Player**
- Created BackgroundAudio.tsx with glassmorphic mute button
- Added to App.tsx as global component
- Handles browser auto-play policy with one-click start
- Spinning ring animation when playing

**November 28, 2025 - WebGL Cloth Wave Video Player**
- Created WavingVideo.tsx with custom GLSL shaders for cloth wave effect
- Created VideoModal.tsx with WebGLErrorBoundary for graceful fallback
- Integrated WebGL player into MediaGallery with "CLOTH WAVE" badge
- Optimized animation loop to use refs instead of state (60fps without React overhead)
- Added FallbackVideoPlayer for devices without WebGL support

**November 28, 2025 - BUTTER SMOOTH 120 FPS Performance**
- Complete rewrite of MediaGallery with momentum-based drag scrolling
- Interactive 3D Gallery with mouse drag rotation + momentum physics
- Map section with lazy-loading iframe and smooth filter transitions
- Ultra-smooth Lenis scroll: lerp 0.04, duration 1.8, wheelMultiplier 0.6
- GPU acceleration on ALL elements: translateZ(0), backface-visibility, will-change
- CSS containment for layout/paint optimization
- Removed all jank sources: instant transitions (100-150ms)
- Mobile-optimized with touch-friendly gestures
- Custom momentum scrolling for horizontal gallery
- requestAnimationFrame-based smooth 3D rotation

**November 28, 2025 - Master Specification Implementation**
- Added mobile device detection via `useIsMobile` hook - serves static fallback instead of 3D Spline on mobile
- Created `AppManager.tsx` - "Time Travel" entry point with iframe to legacy site + "Enter 2025 Experience" button
- Added CSS utilities: `.neon-border` (glowing neon effect), `.dark-map` (grayscale inverted map filter), `.floating-particle` animation
- Updated GameSection with neon-border glow effect
- HeroSection now conditionally renders SplineFallback on mobile devices for performance
- Removed Maggie AI chatbot component

## Adding Videos & Images

**MediaGallery Component** (`client/src/components/MediaGallery.tsx`)

To add your own videos and images, edit the `defaultMedia` array:

```typescript
const defaultMedia: MediaItem[] = [
  { id: 1, type: 'video', src: '/videos/1.mp4', title: 'My Video 1' },
  { id: 2, type: 'video', src: '/videos/2.mp4', title: 'My Video 2' },
  { id: 3, type: 'image', src: '/images/photo.jpg', title: 'My Photo' },
];
```

- For videos: Place files in `public/videos/` folder (1.mp4, 2.mp4, etc.)
- For images: Place files in `public/images/` folder or use URLs
- Type can be 'video' or 'image'

## Key CSS Classes

- `.text-outline` - Kinetic typography with stroke effect, fills on hover
- `.text-stroke` - Secondary outline text effect for gallery items
- `.neon-border` - Glowing indigo/purple neon border with box-shadow
- `.dark-map` - Grayscale inverted Google Maps filter, reverts on hover
- `.floating-particle` - Floating animation for decorative particles
- `.gpu-accelerated` - Forces GPU compositing for smooth animations
- `.media-card` - GPU-optimized video/image cards
- `.media-slider` - Smooth horizontal scroll container