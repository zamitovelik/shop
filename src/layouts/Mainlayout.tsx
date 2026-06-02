import { Outlet, NavLink, Link, } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SearchComponent } from '../components/Search/SearchComponent';
import { CartIcon } from '../components/Cart/CartIcon';
import { LanguageSwitcher } from '../components/Language/LanguageSwitcher';
import { ThemeSwitcher } from '../components/Theme/ThemeSwitcher';
import metro from '../assets/m.png'
import '../styles/App.scss'

export const MainLayout = () => {
  const { t } = useTranslation();

  return (
    <>
       <div className="app">
        <header className="app-header">
          <div className="header-inner">

            
            <Link to="/" className="header-logo">
              <div className="logo-icon"><img src={metro} alt="" className='logo-img' /></div>
              <div className="logo-text">
                <span className="logo-name"></span>
                <span className="logo-tag"></span>
              </div>
            </Link>

            
            <nav className="header-nav">
              <NavLink to="/products" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {t('nav.catalog')}
              </NavLink>
              <NavLink to="/cart" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {t('nav.cart')}
              </NavLink>
            </nav>

           
            <div className="header-spacer" />

           
            <div className="header-tools">
              <SearchComponent />
              <CartIcon />
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>

          </div>
        </header>

        <main className="main-container">
          <Outlet />
        </main>

        <footer className="app-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <Link to='/'><img src={metro} alt=""  className='footer-logo-icon'/></Link>
            </div>
            <p className="footer-copy">{t('footer.copyright')}</p>
            <div className="footer-links">
              <Link to="/products">{t('nav.catalog')}</Link>
              <Link to="/cart">{t('nav.cart')}</Link>
            </div>
          </div>
        </footer>

        
      </div>
    </>
  );
};