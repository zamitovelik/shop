import { useEffect } from "react";
import { AppRoutes } from "./routes/routes";
import { useProductStore } from "./store/productStore";
import { ToastContainer } from "./components/Toast/ToastContainer";
import { useThemeStore } from './store/themeStore'

function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const theme = useThemeStore((state) => state.theme)
 useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
