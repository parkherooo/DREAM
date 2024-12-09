import React from "react";
import "./CategoryItems.css";

const CategoryItems = ({ categories, onCategoryChange }) => {
    const handleClick = (category) => {
        onCategoryChange(category.name); // 선택된 카테고리를 부모로 전달
    };

    return (
        <div className="category-items">
            {categories.map((category, index) => (
                <button
                    key={index}
                    className="category-item"
                    onClick={() => handleClick(category)}
                >
                    <img src={category.img} alt={category.name} />
                    <p>{category.name}</p>
                </button>
            ))}
        </div>
    );
};

export default CategoryItems;
