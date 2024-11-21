import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Link와 현재 경로 확인용 useLocation
import "./Header.css";

const Header = () => {
    const location = useLocation(); // 현재 URL 경로를 가져옴
    const [activeMenu, setActiveMenu] = useState('recommend'); // 기본값을 'recommend'로 설정

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
                {/* 로고 */}
                <Link to="/" className="logo">
                    <h2>DREAM</h2>
                </Link>
                <div>
                    <Link to="/" className="">
                        <h3>HOME</h3>
                    </Link>
                    <Link to="/" className="">
                        <h3>STYLE</h3>
                    </Link>
                    <Link to="/shop" className="">
                        <h3>SHOP</h3>
                    </Link>
                </div>
                {/* 메뉴바 */}
                <div className="menu-bar">
                    <Link
                        to="/recommend"
                        className={activeMenu === 'recommend' || location.pathname === '/recommend' ? 'active' : ''}
                        onClick={() => handleMenuClick('recommend')}
                    >
                        추천
                    </Link>
                    <Link
                        to="/ranking"
                        className={activeMenu === 'ranking' || location.pathname === '/ranking' ? 'active' : ''}
                        onClick={() => handleMenuClick('ranking')}
                    >
                        랭킹
                    </Link>
                    <Link
                        to="/men"
                        className={activeMenu === 'men' || location.pathname === '/men' ? 'active' : ''}
                        onClick={() => handleMenuClick('men')}
                    >
                        남성
                    </Link>
                    <Link
                        to="/women"
                        className={activeMenu === 'women' || location.pathname === '/women' ? 'active' : ''}
                        onClick={() => handleMenuClick('women')}
                    >
                        여성
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
