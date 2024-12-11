import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { productId } = useParams(); // URL에서 상품 ID 가져오기
    const [product, setProduct] = useState(null); // 상품 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 상태
    const [selectedSize, setSelectedSize] = useState(""); // 선택된 사이즈 상태
    const [selectedPrice, setSelectedPrice] = useState(0); // 선택된 가격 상태
    const [selectedStock, setSelectedStock] = useState(0); // 선택된 재고 상태

    // 사이즈, 가격, 재고를 파싱
    const parseSizes = (sizeString) => {
        return sizeString
            ? sizeString.split(",").map((item) => {
                const [size, price, stock] = item.split(":");
                return { size, price: parseInt(price, 10), stock: parseInt(stock, 10) };
            })
            : [];
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${productId}`);
                setProduct(response.data);

                // 사이즈, 가격, 재고 초기 설정
                if (response.data.size) {
                    const sizesWithDetails = parseSizes(response.data.size);
                    if (sizesWithDetails.length > 0) {
                        setSelectedSize(sizesWithDetails[0].size); // 첫 번째 사이즈 선택
                        setSelectedPrice(sizesWithDetails[0].price); // 첫 번째 가격 설정
                        setSelectedStock(sizesWithDetails[0].stock); // 첫 번째 재고 설정
                    }
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <div>Loading...</div>; // 로딩 상태 표시
    if (error) return <div>Error: {error}</div>; // 에러 메시지 표시

    // 이미지 리스트 생성
    const images = product?.p_img ? product.p_img.split(",").map((img) => img.trim()) : [];

    // 사이즈 변경 핸들러
    const handleSizeChange = (e) => {
        const newSize = e.target.value;
        setSelectedSize(newSize);

        // 선택된 사이즈에 맞는 가격과 재고 찾기
        const matchingVariant = parseSizes(product?.size || "").find((variant) => variant.size === newSize);
        if (matchingVariant) {
            setSelectedPrice(matchingVariant.price); // 해당 사이즈의 가격 설정
            setSelectedStock(matchingVariant.stock); // 해당 사이즈의 재고 설정
        }
    };

    // 이전 슬라이드로 이동
    const handlePrevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }
    };

    // 다음 슬라이드로 이동
    const handleNextSlide = () => {
        if (currentSlide < images.length - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    return (
        <div className="product-detail-container">
            {product ? (
                <>
                    {/* 이미지 슬라이드 */}
                    {images.length > 0 ? (
                        <div className="product-detail-slider">
                            <button
                                className="slider-button prev"
                                onClick={handlePrevSlide}
                                disabled={currentSlide === 0}
                            >
                                &#8249;
                            </button>
                            <div className="product-detail-slide">
                                <img
                                    src={`/product_img/${images[currentSlide]}`}
                                    alt={`Product ${currentSlide + 1}`}
                                />
                            </div>
                            <button
                                className="slider-button next"
                                onClick={handleNextSlide}
                                disabled={currentSlide === images.length - 1}
                            >
                                &#8250;
                            </button>
                        </div>
                    ) : (
                        <div className="no-images">이미지가 없습니다</div>
                    )}

                    {/* 상품 정보 */}
                    <div className="product-detail-info">
                        <h1 className="product-detail-name">{product.p_name}</h1>
                        <p className="product-detail-price">{selectedPrice.toLocaleString()}원</p>
                        <p className="product-detail-description">{product.p_details}</p>

                        {/* 사이즈 선택 */}
                        <div className="product-size-selector">
                            <label htmlFor="size-select">사이즈 선택:</label>
                            <select
                                id="size-select"
                                value={selectedSize}
                                onChange={handleSizeChange}
                            >
                                {parseSizes(product.size).map((variant, index) => (
                                    <option key={index} value={variant.size}>
                                        {variant.size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="product-detail-additional-info">
                            <div>
                                <p className="product-detail-stock">재고: {selectedStock}개</p>
                            </div>
                            <div>
                                <span>브랜드:</span> {product.brand}
                            </div>
                        </div>

                        <div className="product-detail-actions">
                        <button className="product-detail-buy-button" disabled={selectedStock <= 0}>
                                구매 {selectedPrice.toLocaleString()}원
                            </button>
                            <button className="product-detail-sell-button">
                                판매 {Math.floor(selectedPrice * 1.2).toLocaleString()}원
                            </button>
                        </div>

                        <div className="product-detail-warning">
                            <p>※ 거래 주의사항 안내</p>
                            <p>교환/환불은 제한될 수 있습니다.</p>
                        </div>
                    </div>
                </>
            ) : (
                <div>Loading product details...</div>
            )}
        </div>
    );
};

export default ProductDetail;
