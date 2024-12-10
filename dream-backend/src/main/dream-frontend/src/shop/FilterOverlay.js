import React, { useState } from "react";
import "./FilterOverlay.css";

const FilterOverlay = ({ closeFilter, selectedFilters = [], onApplyFilters }) => {
    const categories = {
        "상의": ["후드티", "후드집업", "맨투맨", "니트&가디건", "셔츠"],
        "하의": ["청바지", "트랙 팬츠", "조거 팬츠", "반바지"],
        "신발": ["러닝화", "에어포스", "나이키", "아디다스"],
        "가방": ["백팩", "에코백", "크로스백", "숄더백", "미니백"],
        "패션잡화": ["볼캡", "비니", "아이웨어", "양말"],
    };

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true); // 카테고리 섹션 열림 상태
    const [temporaryFilters, setTemporaryFilters] = useState([...selectedFilters]); // 임시 필터 상태

    const toggleCategories = () => {
        setIsCategoriesOpen((prev) => !prev);
    };

    const toggleFilter = (filter) => {
        if (temporaryFilters.includes(filter)) {
            setTemporaryFilters((prev) => prev.filter((item) => item !== filter));
        } else {
            setTemporaryFilters((prev) => [...prev, filter]);
        }
    };

    const applyFilters = () => {
        onApplyFilters(temporaryFilters); // 임시 필터를 적용
        closeFilter(); // 필터 오버레이 닫기
    };

    const resetFilters = () => {
        setTemporaryFilters([]); // 필터 초기화
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
                                onClick={toggleCategories}
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
                                                        temporaryFilters.includes(item) ? "selected" : ""
                                                    }`}
                                                    onClick={() => toggleFilter(item)}
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
