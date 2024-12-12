import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import "./ProductGrid.css";

const ProductGrid = ({ category, appliedFilters }) => {
    const [products, setProducts] = useState([]); // 상품 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const navigate = useNavigate(); // useNavigate 사용 확인

    // 문자열 정규화 함수: 공백 제거 및 소문자로 변환
    const normalizeString = (str) => str.trim().toLowerCase();

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                const endpoint = "http://localhost:8080/products/filter";

                // 필터 데이터를 정규화하여 params 생성
                const params = {
                    category: category === "전체" ? null : normalizeString(category),
                    subcategories: appliedFilters.subcategories?.length > 0
                        ? appliedFilters.subcategories.map(normalizeString).join(",")
                        : null,
                    brands: appliedFilters.brands?.length > 0
                        ? appliedFilters.brands.map(normalizeString).join(",")
                        : null,
                };

                console.log("Params sent to server:", params); // 디버깅용 로그

                // 서버로 필터링된 데이터를 요청
                const response = await axios.get(endpoint, { params });
                setProducts(response.data); // 서버에서 반환된 데이터 저장
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFilteredProducts();
    }, [category, appliedFilters]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // 조건에 맞는 상품이 없을 경우 no-products-message를 화면에 독립적으로 렌더링
    if (products.length === 0) {
        return (
            <div className="no-products-message">
                <img src="/assets/no-products.png" alt="No Products" className="no-products-image" />
                <div>
                    <h3>조건에 맞는 상품이 없습니다.</h3>
                    <p>다른 필터를 선택하거나 검색 조건을 변경해 보세요.</p>
                    <button onClick={() => window.location.reload()} className="refresh-button">
                        필터 초기화
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map((product) => {
                // 첫 번째 이미지 추출
                const firstImage = product.p_img.split(",")[0].trim();

                return (
                    <div
                        key={product.p_num}
                        className="product-card"
                        onClick={() => navigate(`/shop/product/${product.p_num}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={`/product_img/${firstImage}`}
                            alt={product.p_name}
                            className="product-image"
                        />
                        <div className="product-info">
                            <h4 className="product-brand">{product.brand}</h4>
                            <h3 className="product-name">{product.p_name}</h3>
                            <p className="product-details">{product.p_details}</p>
                            <p className="product-price">{product.price.toLocaleString()}원</p>
                            <p className="Immediate-purchase-price">즉시구매가</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductGrid;
