import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Section.scss"
import { useProductStore } from "../store/productStore";
import { ProductCard } from "../components/ProductCard/ProductCard";

export const TrendingProducts = () => {
  const { products } = useProductStore();

  const trending = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 10);

  return (
    <div className="mini-carousel">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={5}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
      >
        {trending.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};