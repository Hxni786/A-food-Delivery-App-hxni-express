// styles/theme.js

const theme = {
  colors: {
    // Cinematic "Stitch" Palette
    primary:        "#00F2FF",   // Neon Cyan
    primaryGlow:    "rgba(0, 242, 255, 0.4)",
    accent:         "#FFD700",   // Gold
    accentGlow:     "rgba(255, 215, 0, 0.3)",

    // Obsidian Backgrounds
    background:     "#0A0A0F",   // Deep Space Black
    surface:        "rgba(255, 255, 255, 0.06)", // Glassmorphism layer
    surfaceDark:    "#111118",
    surfaceAlt:     "rgba(0, 242, 255, 0.03)",

    // Typography
    textPrimary:    "#FFFFFF",   // Crisp White
    textSecondary:  "#A0AEC0",   // Slate Chrome
    textMuted:      "#4A5568",
    textOnPrimary:  "#0A0A0F",

    // Functional
    border:         "rgba(255, 255, 255, 0.12)",
    borderNeon:     "rgba(0, 242, 255, 0.3)",
    star:           "#FFD700",
    success:        "#00FF9F",   // Synthwave Green
    error:          "#FF0055",   // Electric Pink
  },

  fonts: {
    heading:   "PlayfairDisplay_700Bold",
    body:      "Inter_500Medium",
    mono:      "Inter_400Regular",
  },

  spacing: {
    xs:  4,
    sm:  8,
    md:  16,
    lg:  24,
    xl:  32,
    xxl: 64,
  },

  radius: {
    sm:   12,
    md:   22,
    lg:   32,
    full: 999,
  },

  shadow: {
    neon: {
      shadowColor:   "#00F2FF",
      shadowOffset:  { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius:  15,
      elevation:     10,
    },
    gold: {
      shadowColor:   "#FFD700",
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius:  10,
      elevation:     5,
    },
    glass: {
      shadowColor:   "#000000",
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius:  12,
      elevation:     2,
    }
  },
};

export default theme;
