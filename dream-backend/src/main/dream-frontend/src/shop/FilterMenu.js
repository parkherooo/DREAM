import React, { useState } from "react";
import "./FilterMenu.css";
import FilterOverlay from "./FilterOverlay"; // 필터 오버레이 컴포넌트

const FilterMenu = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const openFilter = () => setIsFilterOpen(true);
    const closeFilter = () => setIsFilterOpen(false);

    const filters = ["카테고리", "성별", "브랜드", "사이즈", "가격대"];

    return (
        <div className="filter-menu">
            {filters.map((filter, index) => (
                <button key={index} className="filter-button" onClick={openFilter}>
                    {filter} ▼
                </button>
            ))}

            {/* 필터 오버레이 컴포넌트 */}
            {isFilterOpen && <FilterOverlay closeFilter={closeFilter} />}
        </div>
    );
};

export default FilterMenu;
