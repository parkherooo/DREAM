import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductGrid.css";

const ProductGrid = ({ category }) => { // 카테고리 props 추가
    const [products, setProducts] = useState([]); // 상품 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리

    useEffect(() => {
        // API 호출
        const fetchProducts = async () => {
            try {
                const endpoint = category
                    ? `http://localhost:8080/api/products/category/${category}` // 올바른 URL 경로
                    : `http://localhost:8080/api/products/all`; // 전체 상품 요청
                const response = await axios.get(endpoint);
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]); // 카테고리 변경 시 다시 요청

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-grid">
            {products.map((product) => (
                <div key={product.p_num} className="product-card">
                    <img
                        src={`/product_img/${product.p_img}`}
                        alt={product.p_name}
                        className="product-image"
                    />
                    <div className="product-info">
                        <h4 className="product-brand">{product.category.c_name}</h4>
                        <h3 className="product-name">{product.p_name}</h3>
                        <p className="product-price">{product.price.toLocaleString()}원</p>
                        <p className="Immediate-purchase-price">즉시구매가</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
