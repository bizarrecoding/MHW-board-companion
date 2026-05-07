---
name: Wilderness Hunter
colors:
  surface: '#15130a'
  surface-dim: '#15130a'
  surface-bright: '#3c392e'
  surface-container-lowest: '#100e06'
  surface-container-low: '#1e1c12'
  surface-container: '#222016'
  surface-container-high: '#2c2a20'
  surface-container-highest: '#37352a'
  on-surface: '#e8e2d2'
  on-surface-variant: '#c2c8c2'
  inverse-surface: '#e8e2d2'
  inverse-on-surface: '#333026'
  outline: '#8c928c'
  outline-variant: '#424843'
  surface-tint: '#b4ccbb'
  primary: '#b4ccbb'
  on-primary: '#203529'
  primary-container: '#0a1f14'
  on-primary-container: '#728979'
  inverse-primary: '#4d6355'
  secondary: '#dec1af'
  on-secondary: '#3f2c20'
  secondary-container: '#574335'
  on-secondary-container: '#ccb09f'
  tertiary: '#adcebe'
  on-tertiary: '#19362b'
  tertiary-container: '#022016'
  on-tertiary-container: '#6c8a7c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d0e9d6'
  primary-fixed-dim: '#b4ccbb'
  on-primary-fixed: '#0b1f14'
  on-primary-fixed-variant: '#364b3e'
  secondary-fixed: '#fbddca'
  secondary-fixed-dim: '#dec1af'
  on-secondary-fixed: '#28180d'
  on-secondary-fixed-variant: '#574335'
  tertiary-fixed: '#c9ead9'
  tertiary-fixed-dim: '#adcebe'
  on-tertiary-fixed: '#022016'
  on-tertiary-fixed-variant: '#304d40'
  background: '#15130a'
  on-background: '#e8e2d2'
  surface-variant: '#37352a'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 16px
  margin: 20px
---

## Brand & Style

The design system is rooted in the **Tactile / Skeuomorphic** movement, reimagined for a modern mobile experience. It evokes the feeling of a weathered hunter’s journal discovered in the heart of an ancient, overgrown forest. The brand personality is primal, immersive, and utilitarian, prioritizing the sensation of physical materials—bone, leather, and parchment—over digital abstraction.

The target audience consists of dedicated tabletop players who value immersion. The UI avoids "gamey" high-tech HUDs in favor of a quiet, atmospheric interface that feels like an artifact within the game world. Every interaction should feel heavy and deliberate, like turning a thick leather page or tracing a carving in bone.

## Colors

The palette is anchored in the shadows of the "Deep Dark Forest." The primary background is a near-black forest green, providing a high-contrast foundation for the bone-white text.

- **Primary:** Deep Forest Green (#0A1F14) used for large surfaces and background depths.
- **Secondary:** Aged Leather Brown (#3D2B1F) used for structural elements like headers, sidebars, and containers.
- **Tertiary:** Mossy Teal (#2D4A3E) used for secondary UI elements and subtle highlights.
- **Neutral:** Bone White (#E8E2D2) is the exclusive color for readable content and iconography.
- **Accents:** Bioluminescent Amber and Soft Forest Green are used sparingly for active states, notifications, or "magical" items. These should have a soft, diffused outer glow rather than a sharp digital stroke.

## Typography

The typography strategy balances flavor with extreme legibility. For headings, **Newsreader** provides a traditional, authoritative, and slightly rugged serif look that feels hand-inked onto parchment. It carries the "hunter’s journal" aesthetic without sacrificing readability in dark environments.

For all functional data, body text, and labels, **Work Sans** is used. Its professional and grounded nature ensures that complex board game stats and item descriptions are processed quickly by the player. Labels should often be set in uppercase with slight tracking to mimic stamped leather or etched bone tags.

## Layout & Spacing

This design system utilizes a **Fluid Grid** model designed for mobile and tablet devices. The layout relies on a 4px base unit to maintain a tight rhythmic relationship between related elements.

Margins are generous (20px+) to simulate the borders of a physical page. Content is organized into "kits" or "modules" that stack vertically, separated by significant whitespace (48px) to prevent the dark interface from feeling claustrophobic. Gutters between cards and interactive elements are kept at a consistent 16px to allow for textured "bone" or "leather" borders to occupy space without overlapping.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and physical metaphors rather than shadows. 
- **The Forest Floor (Level 0):** Deep Forest Green (#0A1F14), the base background.
- **Leather Wraps (Level 1):** Secondary containers (#3D2B1F) used for cards and navigation bars. These feature a subtle noise texture to mimic grain.
- **Etched Bone (Level 2):** High-priority modals or selection states. These use a very light version of the Bone White with a weathered, matte texture.
- **Bioluminescence:** Depth is further enhanced by soft, amber radial gradients behind key items to suggest a faint glow emanating from within the dark forest, guiding the user's eye to primary actions.

## Shapes

The shape language is **Soft and Organic**. Sharp digital corners are strictly avoided. Most containers use a base roundedness of 4px to 8px, but edges should ideally feel slightly irregular—as if hand-cut from hide or carved from ivory. 

Decorative elements, such as progress bars or health trackers, should utilize tapered ends and vine-like terminals. Buttons are not perfect rectangles; they feature slightly "bowed" sides to mimic the tension of a drum skin or a leather strap.

## Components

### Buttons & Inputs
Buttons are styled as **Leather Straps** or **Bone Plaques**. Primary actions feature the Aged Leather Brown background with a debossed (inner shadow) effect for the text. Inputs use a simple underline style that looks like a hand-drawn quill stroke on parchment, turning Mossy Teal when active.

### Cards & Containers
Cards represent "Journal Entries" or "Monster Dossiers." They should have a subtle texture overlay—think cracked vellum or wrinkled hide. Borders are not solid lines; they are "stitched" patterns or vine motifs that frame the content.

### Chips & Tags
Chips are used for monster elements (Fire, Water, etc.) and player statuses. These are shaped like small, jagged bone fragments or smooth river stones, with the icon etched into the center.

### Lists & Navigation
Lists are separated by thin, frayed horizontal lines that look like twine. The bottom navigation bar is anchored by a "Leather Bound" strip, with icons that appear to be burnt into the surface (branding-iron style) when inactive, and glowing with soft amber when active.

### Unique Components
- **The Hunter’s Dial:** A circular selection component for tracking health or stamina that looks like a primitive sundial or wooden compass.
- **Scroll Toggles:** Switches that look like small rolled-up pieces of parchment that unroll when toggled on.