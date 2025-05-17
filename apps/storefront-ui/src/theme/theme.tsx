export const theme = {
  colors: {
    background: '#0B1623',         // Deep navy
    primary: '#00AD9F',            // Netlify green
    text: '#F3F6F9',               // Light text
    border: '#1A2636',             // Subtle border
    navBg: '#101B2A',              // Slightly lighter than background
    navShadow: '0 2px 8px rgba(0,173,159,0.08)',
    navActiveBg: 'rgba(0,173,159,0.14)',
    navHoverBg: 'rgba(0,173,159,0.10)',
    cardBg: '#131F2E',             // Card background
    cardShadow: '0 2px 12px rgba(0,173,159,0.07)',
    accent: '#00E599',             // Brighter accent green
    danger: '#FF5A5F',             // For errors or remove buttons
  },
  font: {
    family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    size: '1.08rem',
    weight: 500,
    brandWeight: 'bold',
    brandSize: '1.3rem',
  },
  layout: {
    navHeight: '56px',
    mainPadding: '32px',
    maxWidth: '900px',
  },
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      text: string;
      background: string;
      border: string;
      navBg: string;
      navShadow: string;
      navActiveBg: string;
      navHoverBg: string;
      cardBg: string;
      cardShadow: string;
      accent: string;
      danger: string;
    };
    font: {
      family: string;
      size: string;
      weight: number;
      brandWeight: string;
      brandSize: string;
    };
    layout: {
      navHeight: string;
      mainPadding: string;
      maxWidth: string;
    };
  }
}