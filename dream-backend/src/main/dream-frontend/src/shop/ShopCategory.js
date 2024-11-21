import React from "react";
import { Routes, Route } from "react-router-dom";

function ShopCategory() {
    return (
        <div className="shop-category-content">
            <Routes>
                <Route path="all" element={<div>전체 상품 페이지</div>} />
                <Route path="shoes" element={<div>신발 페이지</div>} />
                <Route path="tops" element={<div>상의 페이지</div>} />
                <Route path="bottoms" element={<div>하의 페이지</div>} />
                <Route path="bags" element={<div>가방 페이지</div>} />
                <Route path="accessories" element={<div>패션잡화 페이지</div>} />
            </Routes>
        </div>
    );
}

export default ShopCategory;
