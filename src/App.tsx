import { useEffect } from "react";
import { AppRoutes } from "./routes/routes";
import { useProductStore } from "./store/productStore";

function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  return <AppRoutes />;
}

export default App;