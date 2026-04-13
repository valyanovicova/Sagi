import { Outlet } from 'react-router';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { BottomNavigation } from './BottomNavigation';

export function Root() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <Outlet />
          <BottomNavigation />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
