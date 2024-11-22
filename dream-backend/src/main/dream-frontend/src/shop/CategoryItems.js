import React from "react";
import "./CategoryItems.css";

const CategoryItems = ({ categories }) => {
    const handleClick = (category) => {
        console.log(`${category.name} 클릭됨!`); // 버튼 클릭 시 동작
    };

    return (
        <div className="category-items">
            {categories.map((category, index) => (
                <button
                    key={index}
                    className="category-item"
                    onClick={() => handleClick(category)} // 클릭 이벤트 추가
                >
                    <img src={category.img} alt={category.name} />
                    <p>{category.name}</p>
                </button>
            ))}
        </div>
    );
};

export default CategoryItems;
