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

**Device Capability Detection (`usePerformance` hook)**
- Detects low-end devices using CPU cores (<4), memory (<4GB), and connection speed
- Detects mobile devices via viewport width and touch capability
- Respects `prefers-reduced-motion` system preference
- Returns `shouldReduceAnimations` flag for conditional rendering decisions

**Conditional Rendering Strategy**
- Low-end/mobile/reduced-motion devices receive completely static JSX components
- High-end devices get full framer-motion animated experiences
- StaticHeroSection vs AnimatedHeroSection - no motion code runs on low-end
- StaticHighlightCard/StaticCategorySection vs Animated versions on Menu page
- SplineScene immediately returns SplineFallback on mobile/low-end (no WebGL loading)

**Spline 3D Deferral System**
- WebGL support detection prevents crashes on unsupported devices
- Mobile/low-end devices skip WebGL entirely and show SplineFallback
- High-end devices get lazy-loaded Spline with AnimatedLoadingUI
- SplineErrorBoundary catches WebGL errors and shows fallback UI

**CSS Performance Optimizations**
- `.gpu-accelerated` class forces GPU compositing with transform3d and will-change
- Reduced motion animations: `spin-slow`, `pulse-slow`, `bounce-slow` run at 30+ seconds
- `@media (prefers-reduced-motion)` disables all animations system-wide
- Mobile-specific styles reduce visual complexity automatically

## Recent Changes

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