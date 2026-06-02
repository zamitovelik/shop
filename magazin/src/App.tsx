
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { SearchPage } from './pages/SearchPage';
import { SearchComponent } from './components/SearchComponent';
import { CartIcon } from './components/CartIcon';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ToastContainer } from './components/ToastContainer';
import { useThemeStore } from './store/themeStore';
import './styles/App.scss';

function App() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1>
              <a href="/">{t('header.title')}</a>
            </h1>
            <p>{t('header.subtitle')}</p>
          </div>
          <div className="header-tools">
            <SearchComponent />
            <CartIcon />
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </header>

        <main className="main-container">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>{t('footer.copyright')}</p>
        </footer>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
