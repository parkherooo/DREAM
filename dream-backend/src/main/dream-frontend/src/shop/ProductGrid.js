import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import _ from "lodash";
import "./ProductGrid.css";

const ProductGrid = ({ category }) => { // 카테고리 props 추가
    const [products, setProducts] = useState([]); // 상품 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const navigate = useNavigate(); // useNavigate 사용 확인

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const endpoint = category === "전체"
                    ? `http://localhost:8080/products/all` // 전체 상품 요청
                    : `http://localhost:8080/products/category/${category}`; // 카테고리별 상품 요청
                const response = await axios.get(endpoint);

                const groupedProducts = _.groupBy(response.data, product => product.p_name + "_" + product.brand);

                const aggregatedProducts = Object.values(groupedProducts).map(group => {
                    const representative = group[0];
                    const totalStock = group.reduce((sum, product) => sum + product.stock_quantity, 0);
                    return {
                        ...representative,
                        stock_quantity: totalStock,
                    };
                });

                setProducts(aggregatedProducts);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-grid">
            {products.map((product) => (
                <div
                    key={product.p_num}
                    className="product-card"
                    onClick={() => navigate(`/shop/product/${product.p_num}`)}
                    style={{cursor: 'pointer'}}
                >
                    <img
                        src={`/product_img/${product.p_img}`}
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
            ))}
        </div>
    );
};

export default ProductGrid;
