import React, { useState } from "react";
import "./BannerSlider.css";

const BannerSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const banners = [
        "https://via.placeholder.com/1200x500?text=Banner+1",
        "https://via.placeholder.com/1200x500?text=Banner+2",
        "https://via.placeholder.com/1200x500?text=Banner+3",
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
        );
    };

    return (
        <div className="banner-slider">
            <button onClick={prevSlide}>＜</button>
            <img src={banners[currentIndex]} alt="Promo Banner" />
            <button onClick={nextSlide}>＞</button>
        </div>
    );
};

export default BannerSlider;
