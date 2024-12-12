import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ShopBanner.css";

const ShopBanner = () => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState("all");

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className="shop-banner">
            {/* SHOP 제목 */}
            <h1 className="shop-title">SHOP</h1>

            {/* 카테고리 메뉴 */}
            <div className="shop-categories">
                <nav className="menu-bar">
                    <Link
                        to="/shop/all"
                        className={activeCategory === "all" || location.pathname === "/shop/all" ? "active" : ""}
                        onClick={() => handleCategoryClick("all")}
                    >
                        전체
                    </Link>
                    <Link
                        to="/shop/tops"
                        className={activeCategory === "tops" || location.pathname === "/shop/tops" ? "active" : ""}
                        onClick={() => handleCategoryClick("tops")}
                    >
                        상의
                    </Link>
                    <Link
                        to="/shop/bottoms"
                        className={activeCategory === "bottoms" || location.pathname === "/shop/bottoms" ? "active" : ""}
                        onClick={() => handleCategoryClick("bottoms")}
                    >
                        하의
                    </Link>
                    <Link
                        to="/shop/shoes"
                        className={activeCategory === "shoes" || location.pathname === "/shop/shoes" ? "active" : ""}
                        onClick={() => handleCategoryClick("shoes")}
                    >
                        신발
                    </Link>
                    <Link
                        to="/shop/bags"
                        className={activeCategory === "bags" || location.pathname === "/shop/bags" ? "active" : ""}
                        onClick={() => handleCategoryClick("bags")}
                    >
                        가방
                    </Link>
                    <Link
                        to="/shop/accessories"
                        className={activeCategory === "accessories" || location.pathname === "/shop/accessories" ? "active" : ""}
                        onClick={() => handleCategoryClick("accessories")}
                    >
                        패션잡화
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default ShopBanner;
