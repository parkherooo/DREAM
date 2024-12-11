import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import _ from "lodash";
import "./ProductGrid.css";

const ProductGrid = ({ category, appliedFilters }) => { // 카테고리 props 추가
    const [products, setProducts] = useState([]); // 상품 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const navigate = useNavigate(); // useNavigate 사용 확인

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                let endpoint = "http://localhost:8080/products/filter";
                const params = {
                    category: category === "전체" ? null : category,
                    subcategories: appliedFilters.length > 0 ? appliedFilters.join(",") : null,
                };

                const response = await axios.get(endpoint, { params });

                setProducts(response.data); // 서버에서 반환된 필터링된 상품 데이터 저장
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
