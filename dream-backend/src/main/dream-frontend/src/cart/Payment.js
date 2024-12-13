import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
    const location = useLocation(); // Cart.js에서 전달된 데이터 가져오기
    const [orderDetails, setOrderDetails] = useState(() => {
        const initialState = location.state?.orderDetails || {
            recipientName: "",
            contact: "",
            address: "",
            request: "요청사항 없음",
            items: [],
            totalPrice: 0,
        };
        console.log("초기화된 주문 정보:", initialState); // 초기 상태 확인
        return initialState;
    });
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [showAddressModal, setShowAddressModal] = useState(false); // 주소 변경 모달 상태
    const [newAddress, setNewAddress] = useState(""); // 새 주소 입력 상태
    const [postcode, setPostcode] = useState(""); // 우편번호

    useEffect(() => {
        console.log("결제 정보:", orderDetails); // 데이터 확인 로그
        setNewAddress(orderDetails.address);
    }, [orderDetails]);

    // 주소 검색 핸들러
    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const fullAddress = data.address; // 기본 주소
                const zonecode = data.zonecode; // 우편번호

                setNewAddress(fullAddress);
                setPostcode(zonecode);
            },
        }).open();
    };

    // 주소 변경 핸들러
    const handleAddressChange = () => {
        const detailedAddress = document.getElementById("detailed-address").value; // 상세 주소 가져오기
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            address: `${postcode} ${newAddress} ${detailedAddress}`, // 기본 주소 + 상세 주소
        }));
        setShowAddressModal(false); // 모달 닫기
    };

    if (loading) {
        return <div className="loading-message">로딩 중...</div>;
    }

    return (
        <div className="payment-container">
            <h1>배송/결제</h1>

            {/* 배송 주소 섹션 */}
            <div className="address-section">
                <h2>배송 주소</h2>
                <div className="address-content">
                    <div>
                        <p>받는 분: {orderDetails.recipientName || "정보 없음"}</p>
                        <p>연락처: {orderDetails.contact || "정보 없음"}</p>
                        <p>주소: {orderDetails.address || "정보 없음"}</p>
                        <p>요청사항: {orderDetails.request}</p>
                    </div>
                    <button
                        className="change-address-button"
                        onClick={() => setShowAddressModal(true)}
                    >
                        주소 변경
                    </button>
                </div>
            </div>

            {/* 주문 상품 섹션 */}
            <div className="order-section">
                <h2>주문 상품</h2>
                {orderDetails.items.map((item) => (
                    <div key={item.p_num} className="order-item">
                        <img
                            src={`/product_img/${item.p_img.split(",")[0]}`}
                            alt={item.p_name}
                            className="order-item-image"
                        />
                        <div className="order-item-details">
                            <h3>{item.p_name}</h3>
                            <p>{item.p_details}</p>
                            <p>사이즈: {item.size}</p>
                            <p>가격: {item.price.toLocaleString()}원</p>
                            <p>수량: {item.p_count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 결제 요약 섹션 */}
            <div className="summary-section">
                <div className="summary-row">
                    <span>상품금액</span>
                    <span>{orderDetails.totalPrice.toLocaleString()}원</span>
                </div>
                <div className="summary-row">
                    <span>배송비</span>
                    <span>5,000원</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                    <span>결제금액</span>
                    <span>{(orderDetails.totalPrice + 5000).toLocaleString()}원</span>
                </div>
            </div>

            <button className="confirm-payment-button">결제하기</button>

            {/* 주소 변경 모달 */}
            {showAddressModal && (
                <div className="modal-overlay">
                    <div className="pay-modal">
                        <h2>주소 변경</h2>
                        <button onClick={handleSearchAddress} className="search-address-button">
                            우편번호 검색
                        </button>
                        <input
                            type="text"
                            value={postcode}
                            readOnly
                            placeholder="우편번호"
                            className="postcode-input"
                        />
                        <textarea
                            id="new-address"
                            value={newAddress}
                            readOnly
                            className="address-input"
                            placeholder="기본 주소"
                        />
                        <textarea
                            id="detailed-address"
                            className="address-input"
                            placeholder="상세 주소"
                        />
                        <div className="pay-modal-buttons">
                            <button
                                className="cancel-button"
                                onClick={() => setShowAddressModal(false)}
                            >
                                취소
                            </button>
                            <button
                                className="confirm-button"
                                onClick={handleAddressChange}
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Payment;
