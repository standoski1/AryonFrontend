// Brand Colors - Updated to use the teal/turquoise color from the provided image
export const BRAND_COLORS = {
    primary: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6", // Main brand color - matches the provided teal/turquoise
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
    },
    secondary: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
  } as const
  
  // CSS Custom Properties for dynamic theming
  export const getCSSVariables = () => ({
    "--brand-primary-50": BRAND_COLORS.primary[50],
    "--brand-primary-100": BRAND_COLORS.primary[100],
    "--brand-primary-200": BRAND_COLORS.primary[200],
    "--brand-primary-300": BRAND_COLORS.primary[300],
    "--brand-primary-400": BRAND_COLORS.primary[400],
    "--brand-primary-500": BRAND_COLORS.primary[500],
    "--brand-primary-600": BRAND_COLORS.primary[600],
    "--brand-primary-700": BRAND_COLORS.primary[700],
    "--brand-primary-800": BRAND_COLORS.primary[800],
    "--brand-primary-900": BRAND_COLORS.primary[900],
  })
  
  // Utility functions for consistent color usage
  export const getBrandColor = (shade: keyof typeof BRAND_COLORS.primary = 500) => {
    return BRAND_COLORS.primary[shade]
  }
  
  export const getSecondaryColor = (shade: keyof typeof BRAND_COLORS.secondary = 500) => {
    return BRAND_COLORS.secondary[shade]
  }
  