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

**Spline 3D Deferral System**
- The heavy Spline 3D library is lazy-loaded using React.lazy
- A CSS-only "CyberLoadingUI" shows instantly while 3D scene loads in background
- Features multiple spinning cyber rings, pulsing coffee icon, and animated progress bar
- Cross-fade transition via AnimatePresence when 3D scene is ready
- SplineErrorBoundary catches WebGL errors and shows fallback UI
- WebGL support detection prevents crashes on unsupported devices

**Loading UI Components**
- `CyberLoadingUI` - Futuristic loading animation with cyber rings and particles
- `SplineFallback` - Static fallback for WebGL-unsupported environments
- Smooth opacity transitions prevent jarring content swaps

## Recent Changes

**November 28, 2025**
- Implemented "Grandmaster Level" performance optimization
- Created CyberLoadingUI with spinning rings, pulsing animations, and status indicators
- Added React.lazy deferral for Spline 3D component
- Implemented cross-fade transition system between loader and 3D scene
- Removed "Order Now" and "Our Story" buttons from Hero section