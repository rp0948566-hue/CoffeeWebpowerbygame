# Design Guidelines: Love Over Coffee - Premium Coffee Shop Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium digital experiences like Apple's product pages (minimalism + bold typography), Stripe (sophisticated dark themes), and modern 3D web experiences (immersive tech aesthetic). This creates a high-end, futuristic coffee shop brand that stands out from traditional cafe websites.

## Core Design Principles
1. **Premium Futurism**: Blend cozy coffee shop warmth with cutting-edge digital aesthetics
2. **Immersive 3D**: Integrate 3D elements as focal points, not decorations
3. **Bold Hierarchy**: Massive typography contrasts with subtle UI elements
4. **Refined Darkness**: Sophisticated dark theme with strategic light accents

## Typography System
- **Display Headings**: Extra bold sans-serif (Black weight), 48-96px
- **Section Titles**: Bold, 32-48px
- **Body Text**: Medium weight, 18-20px for readability on dark backgrounds
- **Menu Items**: Bold for names (18px), regular for descriptions (14px)
- **Accent Text**: Use gradient text effects for brand moments

## Layout System
**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-20 to py-24
- Container max-width: 1280px
- Grid gaps: 6-8 units
- Card padding: p-8

**Grid Strategy**:
- Hero: 2-column split (50/50) on desktop, stack on mobile
- Menu: 2-column card grid on tablet+, single column mobile
- Gallery: 3-column grid desktop, 2-column tablet, 1-column mobile

## Component Library

### Navigation Bar
- Fixed position with backdrop blur
- Height: 80px
- Semi-transparent dark background with subtle border
- Logo on left, nav links center/right, mobile menu toggle
- Smooth scroll anchor links

### Hero Section (Split-Screen)
- **Left Side**: Text content with massive heading, subtext, dual CTA buttons
- **Right Side**: 3D Spline scene in rounded card container with spotlight effect overlay
- Minimum height: 100vh on desktop
- Background: Deep dark (slate-950 equivalent)

### 3D Scene Card
- Large rounded corners (2rem)
- Subtle border with low opacity white
- Contains embedded 3D Spline robot animation
- Spotlight SVG overlay for dramatic lighting effect
- Black/dark transparent background showing through

### Menu Cards
- Semi-transparent white background (5% opacity)
- Subtle borders with hover state highlighting
- Category icon + title at top
- List of items with name, description, price
- Dividers between items

### Buttons
- **Primary**: Solid indigo/purple gradient, full rounded
- **Secondary**: Outline style with transparent background
- Generous padding: px-8, large size
- Clear hover states (brightness/background changes)

### Gallery Images
- Square aspect ratio (1:1)
- Rounded corners (xl)
- Hover scale animation (subtle, 1.05x)
- High-quality food/coffee photography

### Floating Scroll Icon
- Fixed bottom-right position
- Circular background (indigo)
- Rotation animation tied to scroll progress
- Coffee cup icon
- Drop shadow with glow effect

## Visual Treatment

### Color Strategy (Dark Theme)
- **Primary Background**: Very dark slate/navy (near black)
- **Secondary Background**: Slightly lighter slate for cards/sections
- **Accent**: Indigo (#6366f1) to Purple gradient
- **Text Primary**: Near white (98% opacity)
- **Text Secondary**: Gray (60-70% opacity)
- **Borders**: White at 10-20% opacity

### Effects & Animations
- Backdrop blur on navigation
- Smooth scroll behavior
- Entrance animations: Fade up on hero text
- Hover animations: Scale on gallery images, border glow on cards
- Parallax: Rotating coffee icon tied to scroll
- **Keep animations minimal and purposeful**

### Border & Shadow Strategy
- Subtle borders using white/10-20% opacity
- Glow shadows on accent elements (indigo with 50% opacity)
- Avoid heavy drop shadows; prefer glows on dark backgrounds

## Section Specifications

### Hero Section
- Full viewport height (min-h-screen)
- Generous top padding for fixed nav (pt-32)
- Split layout with equal weight to text and 3D scene
- Two CTA buttons with clear hierarchy

### Menu Section
- Background: Slightly different dark shade for contrast
- Large centered section title
- 2-column responsive grid
- Each category gets dedicated card with icon header

### Gallery Section
- Clean centered title
- 3-column masonry-style grid
- All images same size for consistency
- Simple hover interactions

### Contact/Footer (if adding)
- Full-width dark section
- Multi-column layout: Contact info, quick links, newsletter signup
- Social icons, location details
- Copyright text

## Responsive Behavior
- **Desktop (1024px+)**: Full split layouts, 3-column grids
- **Tablet (768-1023px)**: 2-column grids, maintained split on hero
- **Mobile (<768px)**: Single column stack, hamburger menu, full-width cards

## Image Guidelines
**Hero**: 3D Spline scene (no static image - use interactive 3D)
**Gallery**: 3 high-quality images of coffee drinks, food items, cafe ambiance from Unsplash
**Overall**: Minimal image use; 3D scene is the primary visual hero element

## Accessibility Notes
- Maintain WCAG AA contrast ratios (white text on dark backgrounds)
- Focus states visible on all interactive elements
- Mobile menu toggles with clear icons
- Smooth scroll with reduced motion support