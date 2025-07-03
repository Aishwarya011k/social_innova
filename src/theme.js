// New oceanic blue color palette
export const theme = {
  colors: {
    // Primary Colors
    primary: {
      default: '#00B4D8',    // Bright Cyan
      light: '#90E0EF',      // Light Cyan
      dark: '#0077B6',       // Ocean Blue
      hover: '#023E8A',      // Deep Blue
    },
    // Background Colors
    background: {
      default: '#03045E',    // Navy Blue
      light: '#0077B6',      // Ocean Blue
      lighter: '#00B4D8',    // Bright Cyan
      card: 'rgba(3, 4, 94, 0.4)', // Transparent Navy
    },
    // Text Colors
    text: {
      primary: '#CAF0F8',    // Ice Blue
      secondary: '#90E0EF',  // Light Cyan
      accent: '#00B4D8',     // Bright Cyan
      hover: '#48CAE4',      // Sky Blue
    },
    // Border Colors
    border: {
      default: 'rgba(0, 180, 216, 0.3)', // Transparent Cyan
      hover: 'rgba(0, 180, 216, 0.5)',    // More Visible Cyan
    },
    // Shadow Colors
    shadow: {
      default: 'rgba(0, 180, 216, 0.1)',  // Soft Cyan Shadow
      hover: 'rgba(0, 180, 216, 0.2)',    // Deeper Cyan Shadow
    },
    // Status Colors
    accent: {
      success: '#48CAE4',    // Sky Blue
      warning: '#00B4D8',    // Bright Cyan
      error: '#023E8A',      // Deep Blue
      info: '#0077B6',       // Ocean Blue
    },
    // Gradient Colors
    gradient: {
      start: '#03045E',      // Navy Blue
      middle: '#0077B6',     // Ocean Blue
      end: '#00B4D8',        // Bright Cyan
    }
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 180, 216, 0.1)',
    md: '0 4px 6px rgba(0, 180, 216, 0.1)',
    lg: '0 10px 15px rgba(0, 180, 216, 0.1)',
    xl: '0 20px 25px rgba(0, 180, 216, 0.1)',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  }
};
