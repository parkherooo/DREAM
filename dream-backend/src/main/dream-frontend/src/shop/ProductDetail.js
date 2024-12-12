import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome 임포트
import { faBookmark } from "@fortawesome/free-regular-svg-icons"; // 북마크 아이콘 임포트

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedStock, setSelectedStock] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [showMessage, setShowMessage] = useState(""); // 알림 메시지

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

                if (response.data.size) {
                    const sizesWithDetails = parseSizes(response.data.size);
                    if (sizesWithDetails.length > 0) {
                        setSelectedSize(sizesWithDetails[0].size);
                        setSelectedPrice(sizesWithDetails[0].price);
                        setSelectedStock(sizesWithDetails[0].stock);
                    }
                }

                setLoading(false);
                // 로그인 여부 확인 (백엔드 로그인 세션 확인 API 호출)
                const loginResponse = await axios.get("http://localhost:8080/auth/isLoggedIn");
                setIsLoggedIn(loginResponse.data.loggedIn);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    // 관심상품
    const handleFavorite = async () => {
        if (!isLoggedIn) {
            setShowMessage("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/interest/add", {
                user_id: "현재로그인된유저ID", // 로그인된 유저 ID를 서버에서 받아오도록 설정
                p_num: productId,
            });
            if (response.status === 200) {
                setShowMessage("관심상품에 추가되었습니다!");
            }
        } catch (err) {
            setShowMessage("관심상품 추가에 실패했습니다.");
        }

        // 메시지를 몇 초 후에 사라지게 설정
        setTimeout(() => setShowMessage(""), 3000);
    };

    // 사이즈 변경
    const handleSizeChange = (e) => {
        const newSize = e.target.value;
        setSelectedSize(newSize);
        const matchingVariant = parseSizes(product?.size || "").find((variant) => variant.size === newSize);
        if (matchingVariant) {
            setSelectedPrice(matchingVariant.price);
            setSelectedStock(matchingVariant.stock);
        }
    };

    const handleAddToCart = () => {
        alert(`장바구니에 추가되었습니다.`);
        setIsModalOpen(false);
    };

    const handleBuyNow = () => {
        alert(`즉시 구매되었습니다: 사이즈 ${selectedSize}, 가격 ${selectedPrice}원`);
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
                                            onClick={() => {
                                                setSelectedSize(variant.size);
                                                setSelectedPrice(variant.price);
                                                setSelectedStock(variant.stock);
                                            }}
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
                                <button className="favorite-button">
                                    <FontAwesomeIcon icon={faBookmark} className="favorite-icon" />
                                    관심상품
                                </button>
                            </div>
                            {showMessage && <div className="message-box">{showMessage}</div>}

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
