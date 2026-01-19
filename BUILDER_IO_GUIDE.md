# ETERNATUM - Builder.io Editing Guide

## Overview

This is a production-ready, fully editable UI for a game development platform. All sections are component-based, properly sectioned, and optimized for Builder.io editing.

## Architecture

### Page Structure

The landing page (`app/page.tsx`) is organized as follows:

1. **WarpIntro** - Full-screen spaceship animation with starfield
2. **Navbar** - Navigation header with logo and CTAs
3. **HeroCommandPanel** - Main hero section with headline and CTAs
4. **FeaturedGames** - Grid of game cards (Play Zone)
5. **PacManDivider** - Interactive fun divider element
6. **LearnByBuilding** - 3-step progression cards with XP bars
7. **CommunityGameJams** - Community events and creator spotlight
8. **UserScoreboard** - Player stats and achievements
9. **Footer** - Links and copyright

## Components

### Warp Intro (`components/landing/WarpIntro.tsx`)

**Purpose**: Full-screen intro animation with loading phase

**Editable Properties**:
- Player name
- Auto-skip delay (in milliseconds)
- Text phases
- Animation speed

**Accessibility**:
- Skip button always visible
- High contrast text
- No flashing animations (uses fade-in)
- Keyboard navigable (ESC to skip)

### Featured Games (`components/landing/FeaturedGames.tsx`)

**Purpose**: Displays game cards in a responsive grid

**Editable Properties**:
- Section title and subtitle
- Game cards array (title, creator, likes, description, status, thumbnail)
- Grid layout (defaults to 3 columns on desktop)

**Accessibility**:
- Keyboard navigation with Enter/Space to play
- ARIA labels for buttons
- High contrast status badges
- Semantic HTML structure

**Builder Notes**:
- Each game card is individually editable
- Thumbnails can be uploaded or left blank (shows "NO SIGNAL")
- Status badges auto-color based on type (beta, new, featured)

### Pac-Man Divider (`components/landing/PacManDivider.tsx`)

**Purpose**: Fun, interactive brand moment between sections

**Editable Properties**:
- Enable/disable animation
- Animation speed (adjust timing values)
- Visual elements (Pac-Man, ghosts, dots)

**Performance Notes**:
- Uses SVG rendering (lightweight)
- Can be disabled for reduced motion
- Animation is optional (not blocking)

### Learn by Building (`components/landing/LearnByBuilding.tsx`)

**Purpose**: 3-step progression system with XP rewards

**Editable Properties**:
- Step titles, descriptions
- XP rewards per step
- Completion percentages
- Bottom stat cards (total XP, time, difficulty)

**Accessibility**:
- Color-coded progress bars (green, cyan, purple)
- Clear progress indicators
- Semantic heading hierarchy

**Builder Notes**:
- Each step card is independently editable
- Progress bars support animations
- XP values are displayed as badges

### Community & Game Jams (`components/landing/CommunityGameJams.tsx`)

**Purpose**: Social proof and community engagement showcase

**Editable Properties**:
- Game jam events (title, participants, games, status, days left)
- Creator spotlight cards (name, title, stats)
- Community stats section

**Accessibility**:
- Status badges with clear visual hierarchy
- Icon indicators for actions (Users, Zap, Trophy)
- Keyboard accessible cards

### User Scoreboard (`components/landing/UserScoreboard.tsx`)

**Purpose**: Player stats and achievements display

**Editable Properties**:
- Player name
- Level, XP, max XP
- Games built counter
- Achievement badges (customizable with icons)

**Accessibility**:
- ARIA labels for stat sections
- High contrast text for readability
- Focus indicators for interactive elements
- Badges show earned/locked status clearly

## Styling & Theme

### Color System

All colors are defined in `app/globals.css` with CSS theme variables:

- **--color-background**: #0a0a0a (deep navy/black)
- **--color-surface**: #121212 (surface layer)
- **--color-neon-cyan**: #00f0ff (primary accent)
- **--color-electric-purple**: #bf00ff (secondary accent)
- **--color-pixel-green**: #00ff41 (tertiary accent)
- **--color-soft-magenta**: #ff00aa (quaternary accent)

### Typography

- **Headings**: `font-pixel` (Pixelify Sans) - 400-700 weight
- **Body**: `font-sans` (Outfit) - 300-700 weight
- **Code**: Monospace elements use system monospace

### Animations

All animations respect `prefers-reduced-motion`:

- `animate-pulse-slow`: 3s pulse effect
- `animate-bounce`: 10px vertical bounce
- `animate-float`: 3s vertical floating motion
- `fade-in`: Smooth opacity and Y-axis entrance
- `starfield-scroll`: Parallax starfield effect

## Responsive Design

### Breakpoints (Tailwind defaults)

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components use responsive grid layouts:
- Mobile: 1 column
- Tablet: 2-3 columns
- Desktop: 3-4 columns

## Accessibility Compliance

### WCAG 2.1 Level AA

✅ **Implemented**:
- High contrast text (minimum 4.5:1 ratio)
- Semantic HTML structure
- Keyboard navigation (Tab, Enter, Space, ESC)
- ARIA labels on interactive elements
- Focus states visible on all buttons
- Reduced motion support
- Alt text on images (placeholder when missing)
- Skip button on intro animation

✅ **Color Contrast**:
- Text on background: Pass
- Text on surface: Pass
- Interactive elements: Pass with glow effects

### Motion & Animation

- Animations can be toggled off
- No auto-playing audio
- No flashing (>3 Hz)
- Marquee/scrolling content can be paused
- Motion preferences respected

## Builder.io Integration

### What's Editable

Every component is designed to be individually editable:

1. **Text Content**: All user-facing text
2. **Styling**: Colors, spacing (via Tailwind classes)
3. **Layout**: Grid columns, flex direction
4. **Data**: All data arrays (games, creators, achievements)
5. **Interactions**: Click handlers, toggle states

### What's NOT Editable (By Design)

- Global CSS animations (warp, starfield)
- Core component structure
- React hooks logic
- Import statements

### Editing Guidelines

When editing in Builder.io:

1. **Preserve Component Structure**: Don't break component hierarchy
2. **Use Tailwind Classes**: Only add/modify Tailwind classes
3. **Maintain Data Types**: Keep data structures consistent
4. **Test Accessibility**: Verify keyboard navigation still works
5. **Check Reduced Motion**: Verify animations respect user preferences
6. **Mobile Preview**: Always test on mobile view

## Performance Optimizations

### Code Splitting

- Dynamic imports with `next/dynamic` for heavy components
- Lazy loading of images in game cards
- SSR disabled for 3D scene

### Bundle Size

- Lucide icons (lightweight SVG icons)
- Tailwind CSS (production-optimized)
- No heavy dependencies in components

### Runtime Performance

- CSS animations (GPU accelerated)
- SVG rendering for divider
- No unnecessary re-renders (memoization where needed)
- Efficient grid layouts

## Development Workflow

### Adding New Content

1. Update component props interface
2. Add data to component or pass via props
3. Update defaults in component
4. Test on mobile/desktop
5. Verify accessibility

### Customizing Animations

Edit `app/globals.css` for:
- Animation durations
- Easing functions
- Transform values
- Opacity values

### Adding New Sections

1. Create component in `components/landing/`
2. Export default function
3. Import in `app/page.tsx`
4. Add to page structure
5. Pass props and callbacks

## Testing Checklist

- [ ] Desktop browser (Chrome, Firefox, Safari)
- [ ] Mobile browser (iOS Safari, Chrome Mobile)
- [ ] Keyboard navigation (Tab through all interactive elements)
- [ ] Screen reader (VoiceOver, NVDA)
- [ ] Reduced motion enabled
- [ ] High contrast mode
- [ ] Touch interactions on mobile
- [ ] Network throttling (slow 3G)
- [ ] Lighthouse performance audit

## Customization Examples

### Change Primary Color

```css
/* In app/globals.css */
--color-neon-cyan: #00ff00; /* Change to green */
```

### Adjust Animation Speed

```tsx
// In component
<div className="animate-pulse-slow"> {/* Default 3s */}
  // Change animation-duration in globals.css
</div>
```

### Update Game Grid Columns

```tsx
// In FeaturedGames.tsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {/* Now 4 columns on desktop */}
</div>
```

## Support & Troubleshooting

### Common Issues

**Warp intro not showing**: Check `showWarpIntro` state in page.tsx

**Animations stuttering**: Disable on reduced motion; check GPU acceleration

**Images not loading**: Add thumbnail URL to GameCard props

**Colors not appearing**: Verify Tailwind class names in globals.css

### Performance Troubleshooting

1. Check bundle size: `npm run build`
2. Profile runtime: DevTools Performance tab
3. Check Core Web Vitals: Lighthouse audit
4. Monitor network: DevTools Network tab

## Future Enhancements

- [ ] Dark/light mode toggle
- [ ] User authentication integration
- [ ] Real-time multiplayer game lobby
- [ ] Advanced game analytics dashboard
- [ ] Social sharing features
- [ ] Progressive web app (PWA)
- [ ] Offline support

---

**Last Updated**: 2024
**Version**: 1.0.0
**Maintained by**: ETERNATUM Team
