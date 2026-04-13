import { RouterProvider } from 'react-router';
import { router } from './routes';
import { RoleProvider } from './context/RoleContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <RoleProvider>
            <RouterProvider router={router} />
          </RoleProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
