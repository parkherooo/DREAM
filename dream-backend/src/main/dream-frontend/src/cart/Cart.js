import React from "react";
import "./Cart.css";

const Cart = () => {
    return (
        <div className="cart-summary">
            <div className="summary-item">
                <h2>0</h2>
                <p>KREAM 배송</p>
            </div>
            <div className="summary-item">
                <h2>0</h2>
                <p>브랜드 배송</p>
            </div>
            <div className="empty-cart-message">
                <p>장바구니에 담긴 상품이 없습니다.<br />원하는 상품을 장바구니에 담아보세요!</p>
                <button className="shop-now-button">SHOP 바로가기</button>
            </div>
        </div>
    );
};

export default Cart;
