import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const checkSessionAndFetchData = async () => {
            try {
                // 세션 체크
                const sessionResponse = await axios.get("http://localhost:8080/check-session", {
                    withCredentials: true,
                });

                const { isLoggedIn, user_id } = sessionResponse.data;

                if (!isLoggedIn) {
                    alert("로그인이 필요합니다.");
                    navigate("/login"); // 로그인 페이지로 리다이렉트
                    return;
                }

                // 사용자 정보 가져오기
                const userResponse = await axios.get("http://localhost:8080/my-page", {
                    params: { user_id },
                    withCredentials: true,
                });
                setUserInfo(userResponse.data);

                // 장바구니 데이터 가져오기
                const cartResponse = await axios.get("http://localhost:8080/cart", {
                    withCredentials: true,
                });
                setCartItems(cartResponse.data);
                setSelectedItems(cartResponse.data.map((item) => item.p_num)); // 모든 항목 기본 선택
            } catch (error) {
                console.error("Error fetching session or data:", error);
                alert("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        };

        checkSessionAndFetchData();
    }, []);

    const handleRemoveClick = (productId) => {
        setSelectedProductId(productId);
        setModalType("single");
        setShowModal(true);
    };

    const handleRemoveSelectedClick = () => {
        if (selectedItems.length === 0) return;
        setModalType("multiple");
        setShowModal(true);
    };

    const confirmRemoveItem = async () => {
        try {
            if (modalType === "single" && selectedProductId !== null) {
                await axios.delete(`http://localhost:8080/cart/${selectedProductId}`, {
                    withCredentials: true,
                });
                setCartItems(cartItems.filter((item) => item.p_num !== selectedProductId));
                setSelectedItems(selectedItems.filter((id) => id !== selectedProductId));
            } else if (modalType === "multiple") {
                await Promise.all(
                    selectedItems.map((productId) =>
                        axios.delete(`http://localhost:8080/cart/${productId}`, {
                            withCredentials: true,
                        })
                    )
                );
                setCartItems(cartItems.filter((item) => !selectedItems.includes(item.p_num)));
                setSelectedItems([]);
            }
            setShowModal(false);
            setSelectedProductId(null);
        } catch (error) {
            console.error("Error removing items:", error);
        }
    };

    const cancelRemoveItem = () => {
        setShowModal(false);
        setSelectedProductId(null);
    };

    const handleSelectItem = (productId) => {
        if (selectedItems.includes(productId)) {
            setSelectedItems(selectedItems.filter((id) => id !== productId));
        } else {
            setSelectedItems([...selectedItems, productId]);
        }
    };

    const handleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]); // 모두 선택 해제
        } else {
            setSelectedItems(cartItems.map((item) => item.p_num)); // 모두 선택
        }
    };

    const calculateSelectedTotalAmount = () => {
        return cartItems
            .filter((item) => selectedItems.includes(item.p_num))
            .reduce((total, item) => total + item.price * item.p_count, 0);
    };

    const calculateShippingCost = () => {
        return selectedItems.length > 0 ? 5000 : 0;
    };

    const handleOrderNow = () => {
        const orderDetails = {
            recipientName: userInfo.name || "정보 없음",
            contact: userInfo.phone || "정보 없음",
            address: userInfo.address || "정보 없음",
            items: cartItems.filter((item) => selectedItems.includes(item.p_num)),
            totalPrice: calculateSelectedTotalAmount(),
            request: "요청사항 없음",
        };

        console.log("주문 정보:", orderDetails); // 확인용 로그
        navigate("/payment", { state: { orderDetails } });
    };

    return (
        <div className="cart-container">
            <h1 className="cart-h1">장바구니</h1>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>장바구니에 담긴 상품이 없습니다.</p>
                    <button
                        className="shop-button"
                        onClick={() => navigate("/shop/all")}
                    >
                        Shop 바로가기
                    </button>
                </div>
            ) : (
                <>
                    <div className="select-all">
                        <div className="select-all-actions">
                            <input
                                type="checkbox"
                                checked={selectedItems.length === cartItems.length}
                                onChange={handleSelectAll}
                            />
                            <label>전체 선택</label>
                        </div>
                        <button
                            className="remove-selected-button"
                            onClick={handleRemoveSelectedClick}
                            disabled={selectedItems.length === 0}
                        >
                            선택 삭제
                        </button>
                    </div>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.p_num} className="cart-item">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.p_num)}
                                    onChange={() => handleSelectItem(item.p_num)}
                                />
                                <img
                                    src={`/product_img/${item.p_img.split(",")[0].trim()}`}
                                    alt={item.p_name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h2 className="cart-item-title">{item.p_name}</h2>
                                    <p className="cart-item-text">{item.p_details}</p>
                                    <p className="cart-item-text">사이즈: {item.size}</p>
                                    <p className="cart-item-text">가격: {item.price.toLocaleString()}원</p>
                                    <p className="cart-item-text">수량: {item.p_count}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveClick(item.p_num)}
                                    className="delete-button"
                                >
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>상품금액</span>
                            <span>{calculateSelectedTotalAmount().toLocaleString()}원</span>
                        </div>
                        <div className="summary-row">
                            <span>배송비</span>
                            <span>{calculateShippingCost().toLocaleString()}원</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>예상 결제금액</span>
                            <span>
                                {(
                                    calculateSelectedTotalAmount() + calculateShippingCost()
                                ).toLocaleString()}원
                            </span>
                        </div>
                        <div className="summary-actions">
                            <button className="change-options-button">
                                옵션/배송 변경
                            </button>
                            <button
                                className="order-now-button"
                                onClick={handleOrderNow}
                            >
                                바로 주문
                            </button>
                        </div>
                    </div>
                </>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="cart-modal">
                        <h2>상품 삭제</h2>
                        <p>
                            {modalType === "single"
                                ? "상품을 삭제하시겠습니까?"
                                : "선택된 상품을 모두 삭제하시겠습니까?"}
                        </p>
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={cancelRemoveItem}>
                                취소
                            </button>
                            <button className="confirm-button" onClick={confirmRemoveItem}>
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
