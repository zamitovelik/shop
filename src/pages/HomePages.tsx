import { HeroCarousel } from "../hero/HeroCarousel";
import { NewProducts } from "../section/NewProducts";
import { TrendingProducts } from "../section/TrendingProducts";
import { AllProducts } from "../section/AllProducts";
import { useTranslation } from "react-i18next";


export const HomePage = () => {
    const {t} = useTranslation()
  return (
    <div>
      <HeroCarousel />

      <section>
        <h2>{t('new.shirts')}</h2>
        <NewProducts />
      </section>

      <section>
        <h2>{t('trend.now')}</h2>
        <TrendingProducts />
      </section>

      <section>
        <h2>{t('all.items')}</h2>
        <AllProducts />
      </section>
    </div>
  );
};