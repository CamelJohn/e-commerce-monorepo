import { ThemeProvider } from 'styled-components';

export const theme = {
  colors: {
    background: '#18122B',
    primary: '#A259FF',         // Purple
    text: '#F3F0FF',
    border: '#28243c',
    navBg: '#1E1A36',
    navShadow: '0 2px 8px rgba(162,89,255,0.08)',
    navActiveBg: 'rgba(162,89,255,0.18)',
    navHoverBg: 'rgba(162,89,255,0.12)',
  },
  font: {
    family: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    size: '1.1rem',
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

interface IGlobalThemeProviderProps {
  children?: React.ReactNode;
}

const GlobalThemeProvider: React.FC<IGlobalThemeProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);


export default GlobalThemeProvider;