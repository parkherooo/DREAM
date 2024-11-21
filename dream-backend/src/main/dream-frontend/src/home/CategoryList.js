import React from "react";
import "./CategoryList.css";

const CategoryList = () => {
    const categories = [
        "상의", "하의", "신발", "가방", "패션잡화"
    ];

    return (
        <div className="category-list">
            {categories.map((category, index) => (
                <div key={index} className="category-item">
                    <img
                        src={`https://via.placeholder.com/150?text=${category}`}
                        alt={category}
                    />
                    <span>{category}</span>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
