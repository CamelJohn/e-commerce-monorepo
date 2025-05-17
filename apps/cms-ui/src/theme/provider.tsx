import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

interface IGlobalThemeProviderProps {
  children?: React.ReactNode;
}

const GlobalThemeProvider: React.FC<IGlobalThemeProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);


export default GlobalThemeProvider;