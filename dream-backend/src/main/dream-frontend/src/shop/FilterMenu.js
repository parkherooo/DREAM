import React, { useState } from "react";
import "./FilterMenu.css";
import FilterOverlay from "./FilterOverlay"; // 필터 오버레이 컴포넌트

const FilterMenu = ({ onApplyFilters }) => { // 필터 적용 콜백 추가
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]); // 선택된 필터 상태 관리

    const openFilter = () => setIsFilterOpen(true);
    const closeFilter = () => setIsFilterOpen(false);

    const handleApplyFilters = (filters) => {
        setSelectedFilters(filters); // 선택된 필터 저장
        onApplyFilters(filters); // 부모 컴포넌트로 필터 전달
        closeFilter(); // 필터 오버레이 닫기
    };

    const filters = ["카테고리", "성별", "브랜드", "사이즈", "가격대"];

    return (
        <div className="filter-menu">
            {filters.map((filter, index) => (
                <button key={index} className="filter-button" onClick={openFilter}>
                    {filter} ▼
                </button>
            ))}

            {/* 필터 오버레이 컴포넌트 */}
            {isFilterOpen && (
                <FilterOverlay
                    closeFilter={closeFilter}
                    selectedFilters={selectedFilters}
                    onApplyFilters={handleApplyFilters}
                />
            )}
        </div>
    );
};

export default FilterMenu;