import React, { useState } from "react";
import "./FilterOverlay.css";

const FilterOverlay = ({ closeFilter }) => {
    const shoeSizes = [
        70, 80, 90, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170,
        175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245,
        250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320,
        325, 330,
    ];

    const clothingSizes = [
        "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];

    const [priceRange, setPriceRange] = useState([0, 1000]);

    const handleSliderChange = (event) => {
        const { name, value } = event.target;
        setPriceRange((prevRange) =>
            name === "min" ? [Number(value), prevRange[1]] : [prevRange[0], Number(value)]
        );
    };

    const priceOptions = [
        "10만원 이하",
        "10만원대",
        "20만원대",
        "30만원대",
        "30-50만원",
        "50-100만원",
        "100-500만원",
        "500만원 이상",
    ];

    return (
        <div className="overlay-container">
            {/* 어두운 배경 */}
            <div className="overlay-background" onClick={closeFilter}></div>

            {/* 필터 창 */}
            <div className="filter-overlay">
                <div className="filter-overlay-content">
                    <button className="close-button" onClick={closeFilter}>
                        ✕
                    </button>
                    <h2>필터</h2>

                    {/* 필터 섹션들 */}
                    <div className="filter-section">
                        <h3>카테고리</h3>
                        <button>반소매 티셔츠</button>
                        <button>긴소매 티셔츠</button>
                        <button>가디건</button>
                        <button>셔츠</button>
                        <button>더보기</button>
                    </div>

                    <div className="filter-section">
                        <h3>성별</h3>
                        <button>남성</button>
                        <button>여성</button>
                        <button>키즈</button>
                    </div>

                    <div className="filter-section">
                        <h3>브랜드</h3>
                        <button>나이키</button>
                        <button>아디다스</button>
                        <button>스투시</button>
                    </div>

                    <div className="filter-section">
                        <h3>사이즈</h3>
                        <div className="size-group">
                            <h4>신발</h4>
                            <div className="size-options">
                                {shoeSizes.map((size, index) => (
                                    <button key={index} className="size-option">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="size-group">
                            <h4>의류</h4>
                            <div className="size-options">
                                {clothingSizes.map((size, index) => (
                                    <button key={index} className="size-option">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>가격대</h3>
                        <div className="price-options">
                            {priceOptions.map((option, index) => (
                                <button key={index} className="price-option">
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className="price-slider">
                            <span>{priceRange[0]}만원</span>
                            <input
                                type="range"
                                name="min"
                                min="0"
                                max="1000"
                                value={priceRange[0]}
                                onChange={handleSliderChange}
                            />
                            <input
                                type="range"
                                name="max"
                                min="0"
                                max="1000"
                                value={priceRange[1]}
                                onChange={handleSliderChange}
                            />
                            <span>{priceRange[1]}만원+</span>
                        </div>
                    </div>

                    {/* 초기화와 확인 버튼 */}
                    <div className="filter-actions">
                        <button className="reset-button">초기화</button>
                        <button className="apply-button">적용 (86,502 상품 보기)</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterOverlay;
