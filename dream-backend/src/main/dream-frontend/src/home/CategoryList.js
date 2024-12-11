import React from "react";
import "./CategoryList.css";

const CategoryList = () => {
    const categories = [
        { name: "상의", image: "/shirt.png", link: "/shop/tops" },
        { name: "하의", image: "/pant.jpg", link: "/shop/bottoms" },
        { name: "신발", image: "/shoes.png", link: "/shop/shoes" },
        { name: "가방", image: "/bag.png", link: "/shop/bags" },
        { name: "패션잡화", image: "/accessories.png", link: "/shop/accessories" },
    ];

    return (
        <div className="category-list2">
            {categories.map((category, index) => (
                <div key={index} className="category-item2">
                    <a href={category.link}>
                        <img
                            src={category.image}
                            alt={category.name}
                        />
                        <span>{category.name}</span>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
