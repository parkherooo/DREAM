import React, { useState } from "react";
import "./FilterOverlay.css";

const FilterOverlay = ({ closeFilter, selectedFilters = {}, onApplyFilters }) => {
    const categories = {
        "상의": ["후드티", "후드집업", "맨투맨", "니트&가디건", "셔츠"],
        "하의": ["청바지", "트랙 팬츠", "조거 팬츠", "반바지"],
        "신발": ["러닝화", "에어포스", "나이키", "아디다스"],
        "가방": ["백팩", "에코백", "크로스백", "숄더백", "미니백"],
        "패션잡화": ["볼캡", "비니", "아이웨어", "양말"],
    };

    const brands = [
        "IAB Studio", "Stussy", "Nike", "Suade", "Supreme", "Carhartt", "OY", "BAPE",
        "Adidas", "AMI", "A.P.C", "Matin Kim", "Play Comme des Garcons", "Dunst", "Zara",
        "Polyteru", "Needles", "Gonak", "Undermycar", "Thug Club", "HDEX", "Dickies", "Jordan",
        "Asics", "Hoka"
    ];

    const [temporaryFilters, setTemporaryFilters] = useState({
        subcategories: [...(selectedFilters.subcategories || [])],
        brands: [...(selectedFilters.brands || [])]
    });

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true); // 카테고리 섹션 열림 상태
    const [isBrandsOpen, setIsBrandsOpen] = useState(true); // 브랜드 섹션 열림 상태

    const toggleFilter = (type, value) => {
        setTemporaryFilters((prev) => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter((item) => item !== value) // 값 제거
                : [...prev[type], value] // 값 추가
        }));
    };

    const applyFilters = () => {
        onApplyFilters(temporaryFilters); // 객체 형태로 필터 전달
        closeFilter();
    };

    const resetFilters = () => {
        setTemporaryFilters({ subcategories: [], brands: [] }); // 필터 초기화
    };

    return (
        <div className="overlay-container">
            <div className="overlay-background" onClick={closeFilter}></div>
            <div className="filter-overlay">
                <div className="filter-overlay-content">
                    <button className="close-button" onClick={closeFilter}>
                        ✕
                    </button>
                    <h2>필터</h2>

                    {/* 카테고리 섹션 */}
                    <div className="filter-section">
                        <div className="filter-section-header">
                            <h3>카테고리</h3>
                            <button
                                className="toggle-button"
                                onClick={() => setIsCategoriesOpen((prev) => !prev)}
                            >
                                {isCategoriesOpen ? "-" : "+"}
                            </button>
                        </div>
                        {isCategoriesOpen && (
                            <div className="filter-categories">
                                {Object.entries(categories).map(([category, items], index) => (
                                    <div className="category-group" key={index}>
                                        <h4>{category}</h4>
                                        <div className="filter-options">
                                            {items.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`filter-item ${
                                                        temporaryFilters.subcategories.includes(item) ? "selected" : ""
                                                    }`}
                                                    onClick={() => toggleFilter("subcategories", item)}
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 브랜드 섹션 */}
                    <div className="filter-section">
                        <div className="filter-section-header">
                            <h3>브랜드</h3>
                            <button
                                className="toggle-button"
                                onClick={() => setIsBrandsOpen((prev) => !prev)}
                            >
                                {isBrandsOpen ? "-" : "+"}
                            </button>
                        </div>
                        {isBrandsOpen && (
                            <div className="filter-brands">
                                <div className="filter-options">
                                    {brands.map((brand, index) => (
                                        <button
                                            key={index}
                                            className={`filter-item ${
                                                temporaryFilters.brands.includes(brand) ? "selected" : ""
                                            }`}
                                            onClick={() => toggleFilter("brands", brand)}
                                        >
                                            {brand}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 초기화와 확인 버튼 */}
                    <div className="filter-actions">
                        <button className="reset-button" onClick={resetFilters}>
                            초기화
                        </button>
                        <button className="apply-button" onClick={applyFilters}>
                            적용
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterOverlay;
