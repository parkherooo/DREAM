import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Header = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    // 메뉴 클릭 시 활성화 상태 업데이트
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    // 세션 상태 확인 함수 (useCallback으로 메모이제이션)
    const checkSession = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/check-session', { withCredentials: true });
            if (response.data.userId) {
                setIsLoggedIn(true);
                setUserId(response.data.userId);
            } else {
                setUserId(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('세션 확인 실패:', error);
        }
    }, []); // 종속성 없음 (정적 함수)

    useEffect(() => {
        checkSession();
    }, [checkSession]); // checkSession 함수에 종속


    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/Logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            setUserId(null);
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <header>
            <div className="header-top">
                <div className="user-links">
                    <Link to="/my-page">마이페이지</Link>
                    <Link to="/interests">관심</Link>
                    <Link to="/notifications">알림</Link>
                    {isLoggedIn ? (
                        <button className="logout-btn" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            로그아웃
                        </button>
                    ) : (
                        <Link to="/login">로그인</Link>
                    )}
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
                            to="/StyleList"
                            className={activeMenu === 'style' || location.pathname === '/StyleList' ? 'active' : ''}
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
