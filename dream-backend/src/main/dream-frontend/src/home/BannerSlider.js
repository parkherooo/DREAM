import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation을 임포트
import "./BannerSlider.css";

const BannerSlider = () => {

    const banners = [
        "https://via.placeholder.com/1200x500?text=Banner+1",
        "https://via.placeholder.com/1200x500?text=Banner+2",
        "https://via.placeholder.com/1200x500?text=Banner+3",
    ];

    const location = useLocation(); // 현재 경로 가져오기

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
        );
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const [activeMenu, setActiveMenu] = useState('recommend'); // activeMenu 상태를 추가

    const handleMenuClick = (menu) => {
        setActiveMenu(menu); // 메뉴 클릭 시 활성화된 메뉴 상태 업데이트
    };

    return (
        <div>
            <div className="menu-bar">
                <Link
                    to="/recommend"
                    className={activeMenu === 'recommend' || location.pathname === '/recommend' ? 'active' : ''}
                    onClick={() => handleMenuClick('recommend')}
                >
                    추천
                </Link>
                <Link
                    to="/ranking"
                    className={activeMenu === 'ranking' || location.pathname === '/ranking' ? 'active' : ''}
                    onClick={() => handleMenuClick('ranking')}
                >
                    랭킹
                </Link>
                <Link
                    to="/men"
                    className={activeMenu === 'men' || location.pathname === '/men' ? 'active' : ''}
                    onClick={() => handleMenuClick('men')}
                >
                    남성
                </Link>
                <Link
                    to="/women"
                    className={activeMenu === 'women' || location.pathname === '/women' ? 'active' : ''}
                    onClick={() => handleMenuClick('women')}
                >
                    여성
                </Link>
            </div>

            <div className="banner-slider">
                <button onClick={prevSlide}>＜</button>
                <img src={banners[currentIndex]} alt="Promo Banner" />
                <button onClick={nextSlide}>＞</button>
            </div>
        </div>
    );
};

export default BannerSlider;
