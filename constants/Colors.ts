// DESIGN.md "Wilderness Hunter" color tokens
// Dark theme is the primary design target; light theme derived from same principles
export const designColors = {
  dark: {
    // Surface hierarchy (Forest Floor → Leather Wraps → Etched Bone)
    surface: "#15130a",
    surfaceDim: "#15130a",
    surfaceBright: "#3c392e",
    surfaceContainerLowest: "#100e06",
    surfaceContainerLow: "#1e1c12",
    surfaceContainer: "#222016",
    surfaceContainerHigh: "#2c2a20",
    surfaceContainerHighest: "#37352a",
    surfaceVariant: "#37352a",
    surfaceTint: "#b4ccbb",

    // On-surface colors (text/icons on surfaces)
    onSurface: "#fbddca",
    onSurfaceVariant: "#c2c8c2",

    // Inverse colors (for elevated/active states)
    inverseSurface: "#e8e2d2",
    inverseOnSurface: "#333026",
    inversePrimary: "#4d6355",

    // Primary (Deep Forest Green / Bioluminescent Green)
    primary: "#728979",
    onPrimary: "#b4ccbb",
    primaryContainer: "#0a1f14",
    onPrimaryContainer: "#728979",
    primaryFixed: "#d0e9d6",
    primaryFixedDim: "#b4ccbb",
    onPrimaryFixed: "#0b1f14",
    onPrimaryFixedVariant: "#364b3e",

    // Secondary (Aged Leather Brown)
    secondary: "#dec1af",
    onSecondary: "#3f2c20",
    secondaryContainer: "#574335",
    onSecondaryContainer: "#ccb09f",
    secondaryFixed: "#fbddca",
    secondaryFixedDim: "#dec1af",
    onSecondaryFixed: "#28180d",
    onSecondaryFixedVariant: "#574335",

    // Tertiary (Mossy Teal)
    tertiary: "#adcebe",
    onTertiary: "#19362b",
    tertiaryContainer: "#022016",
    onTertiaryContainer: "#6c8a7c",
    tertiaryFixed: "#c9ead9",
    tertiaryFixedDim: "#adcebe",
    onTertiaryFixed: "#022016",
    onTertiaryFixedVariant: "#304d40",

    // Error (Bioluminescent Amber/Red for warnings)
    error: "#ffb4ab",
    onError: "#690005",
    errorContainer: "#93000a",
    onErrorContainer: "#ffdad6",

    // Outline & borders (stitched/vine motif colors)
    outline: "#8c928c",
    outlineVariant: "#424843",

    // Background (legacy alias → surface)
    background: "#15130a",
    onBackground: "#e8e2d2",
  },
  light: {
    // Surface hierarchy (Parchment → Vellum → Bone)
    surface: "#f5f0e6",
    surfaceDim: "#e8e2d2",
    surfaceBright: "#faf6ed",
    surfaceContainerLowest: "#ffffff",
    surfaceContainerLow: "#f0eadc",
    surfaceContainer: "#eae4d6",
    surfaceContainerHigh: "#e4ddcd",
    surfaceContainerHighest: "#ded7c5",
    surfaceVariant: "#d8d1c1",
    surfaceTint: "#4d6355",

    // On-surface colors
    onSurface: "#1c1b16",
    onSurfaceVariant: "#424843",

    // Inverse colors
    inverseSurface: "#333026",
    inverseOnSurface: "#f5f0e6",
    inversePrimary: "#b4ccbb",

    // Primary (Deep Forest Green)
    primary: "#4d6355",
    onPrimary: "#ffffff",
    primaryContainer: "#d0e9d6",
    onPrimaryContainer: "#0b1f14",
    primaryFixed: "#d0e9d6",
    primaryFixedDim: "#b4ccbb",
    onPrimaryFixed: "#0b1f14",
    onPrimaryFixedVariant: "#364b3e",

    // Secondary (Aged Leather Brown)
    secondary: "#574335",
    onSecondary: "#ffffff",
    secondaryContainer: "#fbddca",
    onSecondaryContainer: "#28180d",
    secondaryFixed: "#fbddca",
    secondaryFixedDim: "#dec1af",
    onSecondaryFixed: "#28180d",
    onSecondaryFixedVariant: "#574335",

    // Tertiary
    tertiary: "#304d40",
    onTertiary: "#ffffff",
    tertiaryContainer: "#c9ead9",
    onTertiaryContainer: "#72a997",
    tertiaryFixed: "#c9ead9",
    tertiaryFixedDim: "#adcebe",
    onTertiaryFixed: "#022016",
    onTertiaryFixedVariant: "#304d40",

    // Error
    error: "#ba1a1a",
    onError: "#ffffff",
    errorContainer: "#ffdad6",
    onErrorContainer: "#410002",

    // Outline & borders
    outline: "#727873",
    outlineVariant: "#c2c8c2",

    // Background (legacy alias → surface)
    background: "#f5f0e6",
    onBackground: "#1c1b16",
  },
};

// Legacy Colors object (backward compatibility)
// Maps old color names to DESIGN.md tokens
export default {
  light: {
    // Legacy aliases → design tokens (must come BEFORE spread to be overridable)
    text: designColors.light.onSurface,
    textSecondary: designColors.light.onSurfaceVariant,
    card: designColors.light.surfaceContainer,
    cardBorder: designColors.light.outlineVariant,
    accent: designColors.light.primary,
    tint: designColors.light.primary,
    tint_dark: designColors.light.primary,
    tabIconDefault: designColors.light.onSurfaceVariant,
    tabIconSelected: designColors.light.primary,

    // Direct design token access (spreads all designColors.light keys)
    ...designColors.light,
  },
  dark: {
    // Legacy aliases → design tokens
    text: designColors.dark.onSurface,
    textSecondary: designColors.dark.onSurfaceVariant,
    card: designColors.dark.surfaceContainer,
    cardBorder: designColors.dark.outlineVariant,
    accent: designColors.dark.primary,
    tint: designColors.dark.primary,
    tint_dark: designColors.dark.primary,
    tabIconDefault: designColors.dark.onSurfaceVariant,
    tabIconSelected: designColors.dark.primary,

    // Direct design token access
    ...designColors.dark,
  },
};
