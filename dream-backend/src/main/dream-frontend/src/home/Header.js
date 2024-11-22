import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Link와 현재 경로 확인용 useLocation
import "./Header.css";

const Header = () => {
    const location = useLocation(); // 현재 URL 경로를 가져옴
    const [activeMenu, setActiveMenu] = useState('home'); // 기본값을 'home'으로 설정

    // 메뉴 클릭 시 활성화 상태 업데이트
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    return (
        <header>
            <div className="header-top">
                {/* 우측 상단 링크 */}
                <div className="user-links">
                    <Link to="/my-page">마이페이지</Link>
                    <Link to="/interests">관심</Link>
                    <Link to="/notifications">알림</Link>
                    <Link to="/login">로그인</Link>
                </div>
            </div>
            <div className="headers">

                <div className="header_logo">
                    <Link to="/" className="logo">
                        <h2>DREAM</h2>
                    </Link>
                    <div className="header_menu">
                        <Link
                            to="/"
                            className={activeMenu === 'home' || location.pathname === '/' ? 'active' : ''}
                            onClick={() => handleMenuClick('home')}>
                            HOME
                        </Link>
                        <Link
                            to="/style"
                            className={activeMenu === 'style' || location.pathname === '/style' ? 'active' : ''}
                            onClick={() => handleMenuClick('style')}>
                            STYLE
                        </Link>
                        <Link
                            to="/shop/all"
                            className={activeMenu === 'shop' || location.pathname === '/shop' ? 'active' : ''}
                            onClick={() => handleMenuClick('shop')}>
                            SHOP
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
