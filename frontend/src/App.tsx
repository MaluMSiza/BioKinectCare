import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Calibration from './pages/Calibration';
import About from './pages/About';
import Sidebar from './components/Sidebar';
import { translations } from './translations';

// Common Context Types
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface LanguageContextType {
  language: 'en' | 'pt';
  toggleLanguage: () => void;
  t: (path: string) => any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [language, setLanguage] = useState<'en' | 'pt'>((localStorage.getItem('lang') as 'en' | 'pt') || 'en');
  const isAuthenticated = !!localStorage.getItem('token'); 

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'pt' : 'en'));
  };

  // Simple translation helper to access nested objects via "sidebar.title" string
  const t = (path: string) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result[key] === undefined) return path; // Return path if not found
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/*" element={
              isAuthenticated ? (
                <div className="layout-container" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
                  <Sidebar />
                  <main className="main-content" style={{ flex: 1, padding: '3rem', backgroundColor: 'var(--bg-tertiary)', minHeight: '100vh', overflowY: 'auto' }}>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/patients" element={<Patients />} />
                      <Route path="/calibration" element={<Calibration />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </main>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
