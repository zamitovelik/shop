
import { createRoot } from 'react-dom/client'
import './i18n/config'  
import './styles/global.scss'
import App from './App.tsx'
import "swiper/css";
import "swiper/css/navigation";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
)
