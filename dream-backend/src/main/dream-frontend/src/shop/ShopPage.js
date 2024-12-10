import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import FilterMenu from "./FilterMenu"; // 필터 메뉴
import CategoryItems from "./CategoryItems"; // 카테고리 아이템 컴포넌트
import ProductGrid from "./ProductGrid"; // 상품 그리드
import ProductDetail from "./ProductDetail"; // 상품 상세
import "./ShopPage.css";

// 각 페이지에 전달할 카테고리 데이터를 정의
const categoriesData = {
    all: [
        { name: "인기 니트", img: require("./category_img/인기니트.png") },
        { name: "인기 후드", img: require("./category_img/인기후드.png") },
        { name: "인기 후드집업", img: require("./category_img/인기후드집업.png") },
        { name: "나이키", img: require("./category_img/나이키_전체.png") },
        { name: "아디다스", img: require("./category_img/아디다스_전체.png") },
        { name: "맨투맨 랭킹", img: require("./category_img/맨투맨랭킹.png") },
    ],
    tops: [
        { name: "후드티", img: require("./category_img/인기후드.png") },
        { name: "후드집업", img: require("./category_img/후드집업.png") },
        { name: "맨투맨", img: require("./category_img/맨투맨랭킹.png") },
        { name: "니트&가디건", img: require("./category_img/니트&가디건.png") },
        { name: "셔츠", img: require("./category_img/셔츠.png") },
    ],
    bottoms: [
        { name: "청바지", img: require("./category_img/청바지.png") },
        { name: "트랙 팬츠", img: require("./category_img/트랙팬츠.png") },
        { name: "조거 팬츠", img: require("./category_img/조거팬츠.png") },
        { name: "반바지", img: require("./category_img/반바지.png") },
    ],
    shoes: [
        { name: "러닝화", img: require("./category_img/러닝화.png") },
        { name: "에어포스", img: require("./category_img/에어포스.png") },
        { name: "나이키", img: require("./category_img/나이키_신발.png") },
        { name: "아디다스", img: require("./category_img/아디다스_신발.png") },
    ],
    bags: [
        { name: "백팩", img: require("./category_img/백팩.png") },
        { name: "에코백", img: require("./category_img/에코백.png") },
        { name: "크로스백", img: require("./category_img/크로스백.png") },
        { name: "숄더백", img: require("./category_img/숄더백.png") },
        { name: "미니백", img: require("./category_img/미니백.png") },
    ],
    accessories: [
        { name: "볼캡", img: require("./category_img/볼캡.png") },
        { name: "비니", img: require("./category_img/비니.png") },
        { name: "아이웨어", img: require("./category_img/아이웨어.png") },
        { name: "양말", img: require("./category_img/양말.png") },
    ],
};

function ShopPage() {
    const [appliedFilters, setAppliedFilters] = useState({});

    const handleApplyFilters = (filters) => {
        setAppliedFilters(filters); // 필터 업데이트
    };

    return (
        <div className="shop-category">
            <Routes>
                {/* 전체 */}
                <Route
                    path="all"
                    element={
                        <>
                            <CategoryItems categories={categoriesData.all} /> {/* 전체 카테고리 */}
                            <FilterMenu onApplyFilters={handleApplyFilters} />
                            <ProductGrid category="전체" appliedFilters={appliedFilters} />
                        </>
                    }
                />
                {/* 상의 */}
                <Route
                    path="tops"
                    element={
                        <>
                            <CategoryItems categories={categoriesData.tops} /> {/* 상의 카테고리 */}
                            <FilterMenu onApplyFilters={handleApplyFilters} />
                            <ProductGrid category="상의" appliedFilters={appliedFilters} />
                        </>
                    }
                />
                {/* 하의 */}
                <Route
                    path="bottoms"
                    element={
                        <>
                            <CategoryItems categories={categoriesData.bottoms} /> {/* 하의 카테고리 */}
                            <FilterMenu onApplyFilters={handleApplyFilters} />
                            <ProductGrid category="하의" appliedFilters={appliedFilters} />
                        </>
                    }
                />
                {/* 신발 */}
                <Route
                    path="shoes"
                    element={
                        <>
                            <CategoryItems categories={categoriesData.shoes} /> {/* 신발 카테고리 */}
                            <FilterMenu onApplyFilters={handleApplyFilters} />
                            <ProductGrid category="신발" appliedFilters={appliedFilters} />
                        </>
                    }
                />
                {/* 가방 */}
                <Route
                    path="bags"
                    element={
                        <>
                            <CategoryItems categories={categoriesData.bags} /> {/* 가방 카테고리 */}
                            <FilterMenu onApplyFilters={handleApplyFilters} />
                            <ProductGrid category="가방" appliedFilters={appliedFilters} />
                        </>
                    }
                />
                {/* 패션잡화 */}
                <Route
                    path="accessories"
                    element={
                        <>
                            <CategoryItems categories={categoriesData.accessories} /> {/* 패션잡화 카테고리 */}
                            <FilterMenu onApplyFilters={handleApplyFilters} />
                            <ProductGrid category="패션잡화" appliedFilters={appliedFilters} />
                        </>
                    }
                />
                {/* 상품 상세보기 */}
                <Route path="product/:productId" element={<ProductDetail />} />
            </Routes>
        </div>
    );
}

export default ShopPage;
