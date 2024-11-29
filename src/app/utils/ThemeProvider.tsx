'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props {
  children: React.ReactNode;
  attribute: string;
  defaultTheme: string;
  enableSystem: boolean;
}
const ThemeProvider: React.FC<Props> = ({ children }) => (
  <NextThemesProvider>{children}</NextThemesProvider>
);

export default ThemeProvider;
