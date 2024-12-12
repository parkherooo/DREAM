import React from 'react';
import { Link } from 'react-router-dom'; // react-router-dom을 이용해 네비게이션

function Sidebar() {
    return (
        <div className="mypage-sidebar">
            <ul className="menu">
                <h2>마이 페이지</h2>
                <h3>쇼핑 정보</h3>
                <li><Link to="/my-page/buys-history">구매 내역</Link></li>
                <li><Link to="/my-page/sales-history">판매 내역</Link></li>
                <li><Link to="/my-page/interests">관심</Link></li>
            </ul>
            <ul className="menu">
                <h3>내 정보</h3>
                <li><Link to="/my-page/information">로그인 정보</Link></li>
                <li><Link to="/my-page/profile">프로필 관리</Link></li>
                <li><Link to="/my-page/address">주소록</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;