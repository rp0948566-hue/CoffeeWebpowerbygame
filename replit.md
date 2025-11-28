# Love Over Coffee - Premium Coffee Shop Website

## Overview
Love Over Coffee is a premium coffee shop website built with React, TypeScript, and modern web technologies. It features immersive 3D animations, smooth page transitions, and a sophisticated dark-themed design. The site showcases coffee, food, and beverage offerings through an award-winning animated interface, with dedicated pages for home and menu exploration. Key capabilities include adaptive graphics for performance across devices, a WebGL cloth wave video player, and a global background music player.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: React 18, TypeScript, Vite, React Router DOM, Tailwind CSS.
- **Component Structure**: Modular architecture with UI primitives (shadcn/ui), feature components, and page-based routing.
- **Animation & Interaction**: Framer Motion for animations, Spline for 3D scenes (lazy-loaded), Lenis for smooth scrolling, and custom liquid curtain page transitions.
- **State Management**: React Query for server state, React hooks for local component state, custom hooks for utilities.
- **Design System**: Custom Tailwind config, CSS variables for theming, Titan One & DM Sans fonts, glassmorphism and gradient effects.
- **Performance Optimizations**: Adaptive graphics engine (`usePerformanceMode` hook) with HIGH/MEDIUM/LOW tiers based on device capabilities (CPU, RAM, connection, mobile detection). Conditional rendering for 3D/animations, Lenis scroll (desktop only), and CSS optimizations (e.g., `backdrop-filter` removal on mobile, `content-visibility`, `contain: strict`).
- **Interactive Elements**: Custom coffee cup cursor (`CoffeeCursor.tsx`), glassmorphic vertical scroll navigation (`ScrollNavigation.tsx`), and a "Time Travel to 2024" glass portal (`DrinkPortal.tsx`).

### Backend Architecture
- **Server Framework**: Express.js with TypeScript, supporting HTTP and WebSocket capabilities.
- **API Structure**: RESTful API design with `/api` prefix, route registration, and static file serving.
- **Storage Layer**: Abstracted `IStorage` interface with an in-memory `MemStorage` implementation; Drizzle ORM configured for PostgreSQL migration support.
- **Build System**: Dual build process (client with Vite, server with esbuild) for production optimization and HMR in development.

### Feature Specifications
- **WebGL Cloth Wave Video Player**: `WavingVideo.tsx` (Three.js with GLSL shaders for cloth wave effect, mouse interaction), `VideoModal.tsx` (full-screen modal with error handling and fallback to HTML5 video).
- **Global Background Music Player**: `BackgroundAudio.tsx` (fixed glassmorphic button, mute toggle, visual feedback, browser auto-play policy handling).
- **Media Gallery**: Momentum-based drag scrolling, interactive 3D elements, and GPU acceleration for smooth performance.
- **Menu Page**: 50+ items across categories with high-quality images, 4-column responsive grid, glassmorphic price badges.

## External Dependencies

### 3D Graphics & Animation
- **Spline**: `@splinetool/react-spline`, `@splinetool/runtime` for 3D scene rendering.
- **Lenis**: `@studio-freight/react-lenis` for smooth scrolling.
- **Framer Motion**: For declarative animations.
- **Three.js Ecosystem**: `@react-three/fiber`, `@react-three/drei` for WebGL video player.

### UI Component Library
- **Radix UI**: Accessible, unstyled UI primitives.
- **shadcn/ui**: Component system built on Radix with Tailwind.
- **Lucide React**: Icon library.

### Form & Validation
- **React Hook Form**: Form state management.
- **Zod**: Schema validation.
- **Drizzle-Zod**: Database schema to validation schema conversion.

### Database & ORM
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect.
- **Neon Serverless**: `@neondatabase/serverless` for PostgreSQL driver.
- **Drizzle Kit**: For schema migrations.

### Styling & Utilities
- **Tailwind CSS**: Utility-first CSS framework.
- **Class Variance Authority**: Type-safe variant styling.
- **clsx**, **tailwind-merge**: Conditional class name utilities.
- **PostCSS** with **Autoprefixer**: CSS processing.

### Development Tools
- **TypeScript**: Static type checking.
- **ESBuild**: Fast server bundling.

### Session & Storage
- **Express Session** with `connect-pg-simple` (configured for PostgreSQL but not actively used).
- **Memorystore**: Fallback session store.