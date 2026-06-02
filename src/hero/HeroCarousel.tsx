import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner6 from "../assets/banner6.jpg";
import banner5 from "../assets/banner5.jpg";
import banner4 from "../assets/banner4.jpg";

import "./HeroCarousel.scss";
import { useTranslation } from "react-i18next";



export const HeroCarousel = () => {
  const { t } = useTranslation();
  const slides = [
  
  {
    id: 1,
    title: t("hero.sale"),
    image: banner6,
  },
  {
    id: 2,
    title: t("hero.new"),
    image: banner5,
  },
  {
    id: 3,
    title: t("hero.top"),
    image: banner4,
  },
];
  return (
    <div className="hero-carousel">
      <Swiper
        className="hero-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide">
              <div
                className="hero-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              <div className="hero-content">
                <h2 className="hero-title">{slide.title}</h2>
                <p className="hero-subtitle">
                  
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};