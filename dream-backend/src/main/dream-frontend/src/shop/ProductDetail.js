import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedSize, setSelectedSize] = useState(""); // 선택된 사이즈
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedStock, setSelectedStock] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); // 관심상품 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

    const parseSizes = (sizeString) => {
        return sizeString
            ? sizeString.split(",").map((item) => {
                const [size, price, stock] = item.split(":");
                return { size, price: parseInt(price, 10), stock: parseInt(stock, 10) };
            })
            : [];
    };

    // 상품 데이터 로드
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${productId}`);
                setProduct(response.data);

                if (response.data.size) {
                    const sizesWithDetails = parseSizes(response.data.size);
                    if (sizesWithDetails.length > 0) {
                        const defaultSize = sizesWithDetails[0];
                        setSelectedSize(defaultSize.size);
                        setSelectedPrice(defaultSize.price);
                        setSelectedStock(defaultSize.stock);
                    }
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
        checkSession();
    }, [productId]);

    // 관심상품 여부 확인 (사이즈 변경 시 호출)
    useEffect(() => {
        if (selectedSize) {
            checkInterest();
        }
    }, [selectedSize]); // 선택된 사이즈가 변경될 때마다 실행

    // 세션 체크
    const checkSession = async () => {
        try {
            const response = await axios.get("http://localhost:8080/check-session", { withCredentials: true });
            setIsLoggedIn(response.data.isLoggedIn);
        } catch (error) {
            console.error("Error checking session:", error);
            setIsLoggedIn(false);
        }
    };

    // 관심상품 여부 확인
    const checkInterest = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/interests/check`,
                { params: { productId, size: selectedSize }, withCredentials: true }
            );
            setIsFavorite(response.data); // 선택된 사이즈에 따른 관심상품 여부 설정
        } catch (error) {
            console.error("Error checking interest:", error);
        }
    };

    // 관심상품 추가/삭제 토글
    const handleToggleFavorite = async () => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (isFavorite) {
            // 관심상품 삭제
            try {
                const response = await axios.delete(
                    `http://localhost:8080/interests`,
                    { params: { productId, size: selectedSize }, withCredentials: true }
                );
                if (response.status === 200) {
                    alert("관심상품에서 삭제되었습니다.");
                    setIsFavorite(false); // 상태 업데이트
                }
            } catch (error) {
                console.error("Error removing from favorites:", error);
                alert("관심상품 삭제 중 문제가 발생했습니다.");
            }
        } else {
            // 관심상품 추가
            try {
                const response = await axios.post(
                    "http://localhost:8080/interests",
                    { p_num: productId },
                    { params: { size: selectedSize }, withCredentials: true }
                );
                if (response.status === 200) {
                    alert("관심상품에 추가되었습니다.");
                    setIsFavorite(true); // 상태 업데이트
                }
            } catch (error) {
                console.error("Error adding to favorites:", error);
                alert("관심상품 추가 중 문제가 발생했습니다.");
            }
        }
    };

    // 사이즈 변경
    const handleSizeChange = (newSize) => {
        setSelectedSize(newSize);
        const matchingVariant = parseSizes(product?.size || "").find((variant) => variant.size === newSize);
        if (matchingVariant) {
            setSelectedPrice(matchingVariant.price);
            setSelectedStock(matchingVariant.stock);
        }
    };

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/cart",
                {
                    p_num: productId,
                    p_count: 1, // 수량은 기본값으로 1
                },
                { params: { size: selectedSize }, withCredentials: true }
            );

            if (response.status === 200) {
                alert("장바구니에 상품이 담겼습니다.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("장바구니 담기 중 문제가 발생했습니다.");
        }

        setIsModalOpen(false);
    };

    const handleBuyNow = () => {
        alert(`즉시 구매되었습니다.`);
        setIsModalOpen(false);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, images.length - 1));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const images = product?.p_img ? product.p_img.split(",").map((img) => img.trim()) : [];

    return (
        <>
            <div className={`product-detail-container ${isModalOpen ? "blurred-background" : ""}`}>
                {product && (
                    <>
                        {/* 이미지 슬라이드 */}
                        <div className="product-detail-slider">
                            <button className="slider-button prev" onClick={handlePrevSlide} disabled={currentSlide === 0}>
                                &#8249;
                            </button>
                            <div className="product-detail-slide">
                                <img src={`/product_img/${images[currentSlide]}`} alt={`Product ${currentSlide + 1}`} />
                            </div>
                            <button
                                className="slider-button next"
                                onClick={handleNextSlide}
                                disabled={currentSlide === images.length - 1}
                            >
                                &#8250;
                            </button>
                        </div>

                        {/* 상품 정보 */}
                        <div className="product-detail-info">
                            <h1 className="product-detail-name">{product.p_name}</h1>
                            <p className="product-detail-description">{product.p_details}</p>
                            <p className="product-detail-price">{selectedPrice.toLocaleString()}원</p>

                            <div className="product-size-selector">
                                <p>사이즈 선택:</p>
                                <div className="size-options">
                                    {parseSizes(product.size).map((variant, index) => (
                                        <button
                                            key={index}
                                            className={`size-option ${selectedSize === variant.size ? "selected" : ""}`}
                                            onClick={() => handleSizeChange(variant.size)}
                                        >
                                            {variant.size}
                                        </button>
                                    ))}
                                </div>
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
                                <button onClick={() => setIsModalOpen(true)} className="product-detail-buy-button">
                                    구매 {selectedPrice.toLocaleString()}원
                                </button>
                                <button className="product-detail-sell-button">
                                    판매 {Math.floor(selectedPrice * 1.2).toLocaleString()}원
                                </button>
                            </div>

                            {/* 관심상품 버튼 */}
                            <div className="product-detail-favorite">
                                <button className="favorite-button" onClick={handleToggleFavorite}>
                                    <FontAwesomeIcon
                                        icon={isFavorite ? faSolidBookmark : faRegularBookmark}
                                        className={`favorite-icon ${isFavorite ? "active" : ""}`}
                                    />
                                    {isFavorite ? "관심상품 등록됨" : "관심상품"}
                                </button>
                            </div>

                            <div className="product-detail-warning">
                                <p>※ 거래 주의사항 안내</p>
                                <p>교환/환불은 제한될 수 있습니다.</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* 구매 모달 */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>
                            ✕
                        </button>
                        <h2>구매하기</h2>
                        <div className="modal-product-info">
                            <img src={`/product_img/${images[0]}`} alt={product.p_name} />
                            <h1 className="product-detail-name">{product.p_name}</h1>
                            <p>{product.p_details}</p>
                            <p>사이즈: {selectedSize}</p>
                            <p>{selectedPrice.toLocaleString()}원</p>
                        </div>
                        <div className="modal-actions">
                            <button className="add-to-cart-button" onClick={handleAddToCart}>
                                장바구니 담기
                            </button>
                            <button className="buy-now-button" onClick={handleBuyNow}>
                                즉시 구매하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;
