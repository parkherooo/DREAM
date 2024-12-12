import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./BannerSlider.css";

const BannerSlider = () => {
    const banners = [
        "/img.png",
        "/img_1.png",
        "/img_2.png",
        "/img_3.png",
        "/img_4.png",
    ];

    const location = useLocation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeMenu, setActiveMenu] = useState("recommend");

    // 자동 슬라이더 설정
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // 3초마다 슬라이드 전환
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    return (
        <div>
            <div className="menu-bar">
                <Link
                    to="/recommend"
                    className={activeMenu === "recommend" || location.pathname === "/recommend" ? "active" : ""}
                    onClick={() => handleMenuClick("recommend")}
                >
                    추천
                </Link>
                <Link
                    to="/ranking"
                    className={activeMenu === "ranking" || location.pathname === "/ranking" ? "active" : ""}
                    onClick={() => handleMenuClick("ranking")}
                >
                    랭킹
                </Link>
                <Link
                    to="/men"
                    className={activeMenu === "men" || location.pathname === "/men" ? "active" : ""}
                    onClick={() => handleMenuClick("men")}
                >
                    남성
                </Link>
                <Link
                    to="/women"
                    className={activeMenu === "women" || location.pathname === "/women" ? "active" : ""}
                    onClick={() => handleMenuClick("women")}
                >
                    여성
                </Link>
            </div>

            <div className="banner-slider">
                <button onClick={prevSlide}>＜</button>
                <div
                    className="slider-container"
                    style={{
                        display: "flex",
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: "transform 0.5s ease-in-out",
                    }}
                >
                    {banners.map((src, index) => (
                        <img key={index} src={src} alt={`Slide ${index + 1}`} />
                    ))}
                </div>
                <button onClick={nextSlide}>＞</button>
                <div className="dots">
                    {banners.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${currentIndex === index ? "active" : ""}`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerSlider;
