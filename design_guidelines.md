# AR Object Recognition Chat App - Design Guidelines

## Visual Style
**Glassmorphic Smart Interface** - Inspired by modern smart home control panels with frosted glass effects, semi-transparent cards, and sophisticated aesthetics.

## Color Palette

### Primary Colors
- **Primary**: Circle T Blue `hsl(200, 80%, 45%)`
- **Background**: Dark with subtle gradients
- **Glass Cards**: Semi-transparent dark `rgba(0, 0, 0, 0.3)` to `rgba(0, 0, 0, 0.6)`
- **Text**: White for primary, light gray for secondary
- **Borders**: Subtle `rgba(255, 255, 255, 0.1)`

### Object-Specific Accent Colors
- **Graffiti**: Purple `hsl(280, 70%, 50%)`
- **Syringe**: Orange/Red `hsl(24, 80%, 50%)`
- **Dog Waste**: Brown `hsl(30, 60%, 45%)`

## Glassmorphism Design System

### Glass Effect Properties
- **Backdrop Filter**: `blur(20px)` or higher
- **Background**: `rgba(0, 0, 0, 0.4)` with subtle transparency
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`
- **Border Radius**: `16px` to `24px` for cards
- **Box Shadow**: Soft, elevated shadows

### Card Components
- Semi-transparent backgrounds with backdrop blur
- Rounded corners (12-24px depending on size)
- Subtle borders for definition
- Generous internal padding
- Floating appearance with shadows

## Typography

**Font Stack**: Roboto, -apple-system, BlinkMacSystemFont, sans-serif

**Hierarchy**:
- **Headings**: 24-32px, bold, white
- **Subheadings**: 18-20px, semibold, white
- **Body Text**: 16px, regular, white
- **Secondary Text**: 14px, regular, light gray
- **Labels**: 12-14px, medium, gray

## Layout System

### Home Page Grid
- Card-based grid layout
- Multiple cards showcasing different features
- Consistent spacing between cards (16-24px)
- Responsive grid that adapts to screen size

### Spacing
- **Card Padding**: 20-24px
- **Grid Gap**: 16-20px
- **Element Spacing**: 12-16px between related items
- **Section Spacing**: 24-32px between major sections

### Mobile-First Responsive
- Stack cards vertically on mobile
- Optimize touch targets (minimum 44px)
- Safe area insets for modern phones

## Component Patterns

### Glass Cards
```
background: rgba(0, 0, 0, 0.4)
backdrop-filter: blur(20px)
border: 1px solid rgba(255, 255, 255, 0.1)
border-radius: 16px
padding: 20px
```

### Interactive Elements
- Toggle switches with blue accent
- Circular icon buttons
- Smooth hover/active states
- Blue highlight color for active states

### Icons
- Clean, modern iconography
- Consistent sizing (20-24px standard)
- White or accent colored
- Good contrast against dark backgrounds

## AR Interface (Camera Mode)

### Camera View
- Full-screen camera feed
- Minimal overlay interference
- High contrast UI elements

### Object Indicator (Top)
- Floating badge with detected object info
- Backdrop blur for readability
- Icon + object name
- Accent color coding

### Chat Overlay (Bottom Third)
- Fixed height at 33vh
- 100% transparent background
- Scrollable message area
- Semi-transparent message bubbles with blur
- Horizontal scrollable quick action chips

## Animations & Interactions

- Smooth transitions (200-300ms)
- Subtle scale effects on press
- Fade in/out for overlays
- Slide up/down for panels
- No jarring movements

## Accessibility

- High contrast text (white on dark)
- Large touch targets
- Clear visual hierarchy
- Readable font sizes
- Alternative text for images
- Screen reader support

## Performance

- Optimize blur effects
- Lazy load where possible
- Efficient animations (transform/opacity only)
- Fast camera feed rendering

---

**Design Philosophy**: Create a sophisticated, modern interface that feels premium and futuristic while maintaining excellent usability for council workers in field conditions. The glassmorphic style provides visual appeal without sacrificing functionality.
