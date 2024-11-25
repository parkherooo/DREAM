import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductGrid.css";

const ProductGrid = () => {
    const [products, setProducts] = useState([]); // 상품 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리

    useEffect(() => {
        // API 호출
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/products/all"); // API 호출
                setProducts(response.data); // 상품 데이터 설정
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-grid">
            {products.map((product, index) => (
                <div key={index} className="product-card">
                    <img src={product.pImg} alt={product.p_name} className="product-image" />
                    <div className="product-info">
                        <h4 className="product-brand">{product.brand}</h4>
                        <h3 className="product-name">{product.p_name}</h3>
                        <p className="product-price">{product.price.toLocaleString()}원</p>
                        <p className="product-delivery">📦 빠른배송</p>
                        <div className="product-meta">
                            <span>{product.stock_quantity} 개 남음</span>
                            <span>❤️ {Math.floor(Math.random() * 1000)} 찜</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
