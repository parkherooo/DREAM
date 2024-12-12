import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import AlarmOverlay from './alarm/AlarmOverlay'; // 오버레이 컴포넌트 가져오기

axios.defaults.withCredentials = true;

const Header = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user_id, setUser_id] = useState(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false); // 알림 오버레이 상태

    // 메뉴 클릭 시 활성화 상태 업데이트
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    // 세션 상태 확인 함수 (useCallback으로 메모이제이션)
    const checkSession = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/check-session', { withCredentials: true });
            if (response.data.user_id) {
                setIsLoggedIn(true);
                setUser_id(response.data.user_id);
            } else {
                setUser_id(null);
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
            setUser_id(null);
            window.location.reload();
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    // 알림 오버레이 열기
    const handleAlarmClick = (e) => {
        e.preventDefault(); // 기본 동작 방지
        setIsOverlayOpen(true);
    };

    // 알림 오버레이 닫기
    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };

    return (
        <>
            <header>
                <div className="header-top">
                    <div className="user-links">
                        <Link to="/my-page">마이페이지</Link>
                        <Link to="/interests">관심</Link>
                        <Link to="#" onClick={handleAlarmClick}> {/* 알림 버튼 */}
                            알림
                        </Link>
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
                        <Link
                            to="/"
                            className="logo"
                            onClick={() => handleMenuClick('home')}
                        >
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

                            {/* 검색 및 장바구니 아이콘 추가 */}
                            <Link to="/cart" className="icon-link">
                                <HiOutlineShoppingBag className="icon" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            {/* 알림 오버레이 표시 */}
            {isOverlayOpen && <AlarmOverlay onClose={closeOverlay} />}
        </>
    );
};

export default Header;
