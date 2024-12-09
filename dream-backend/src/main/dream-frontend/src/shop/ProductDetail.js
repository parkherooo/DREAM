import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { productId } = useParams(); // URL에서 상품 ID 가져오기
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 상품 데이터 가져오기
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-detail-container">
            <div className="product-detail-image">
                <img src={`/product_img/${product.p_img}`} alt={product.p_name}/>
            </div>

            <div className="product-detail-info">
                <h1 className="product-detail-name">{product.p_name}</h1>
                <p className="product-detail-price">{product.price.toLocaleString()}원</p>
                <p className="product-detail-description">{product.p_details}</p>

                <div className="product-detail-additional-info">
                    <div>
                        <span>브랜드:</span> {product.brand}
                    </div>
                    <div>
                        <span>사이즈:</span> {product.size || "모든 사이즈"}
                    </div>
                    <div>
                        <span>재고:</span> {product.stock_quantity}개
                    </div>
                </div>

                <div className="product-detail-actions">
                    <button className="product-detail-buy-button">구매 {product.price.toLocaleString()}원</button>
                    <button
                        className="product-detail-sell-button">판매 {Math.floor(product.price * 1.2).toLocaleString()}원
                    </button>
                </div>

                <div className="product-detail-warning">
                    <p>※ 거래 주의사항 안내</p>
                    <p>교환/환불은 제한될 수 있습니다.</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
