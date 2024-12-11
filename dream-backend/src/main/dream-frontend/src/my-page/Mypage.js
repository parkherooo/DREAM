import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import './Mypage.css';

function Mypage() {
    const [userData, setUserData] = useState({
        name: '',
        user_id: '',
        buysHistory: [],
        salesHistory: [],
        interests: [],
    });
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8080/my-page', {
                    params: { user_id: 'aaa@aaa.com'},
                });
                const salesResponse = await axios.get('http://localhost:8080/my-page/sales-history', {
                    params: { user_id: userResponse.data.user_id },
                });
                const buysResponse = await axios.get('http://localhost:8080/my-page/buys-history', {
                    params: { user_id: userResponse.data.user_id },
                });
                const interestsResponse = await axios.get('http://localhost:8080/my-page/interests', {
                    params: { user_id: userResponse.data.user_id },
                });

                setUserData({
                    name: userResponse.data.name,
                    user_id: userResponse.data.user_id,
                    buysHistory: buysResponse.data,   // 구매 내역
                    salesHistory: salesResponse.data, // 판매 내역
                    interests: interestsResponse.data,  // 관심 상품
                });
                setLoading(false);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // 상태별 개수 계산
    const SbidCount = userData.salesHistory.filter(item => item[3] === 0).length;
    const SfinishedCount = userData.salesHistory.filter(item => item[3] === 1).length;
    const BbidCount = userData.buysHistory.filter(item => item[3] === 0).length;
    const BfinishedCount = userData.buysHistory.filter(item => item[3] === 1).length;


    const handleProfileEdit = () => {
        navigate('/my-page/profile'); // 프로필 관리 페이지로 이동
    };

    const handleStyle = () => {
        navigate('/my-style'); // 스타일 페이지로 이동
    };


    return (
        <div className="mypage">
            <Sidebar/>
            <div className="mypage-container">
                <div className="profile-info">
                    <div className="profile-image"></div>
                    <div className="profile-details">
                        <h3>{userData.name}</h3>
                        <p>{userData.user_id}</p>
                    </div>
                    <div className="profile-buttons">
                        <button onClick={handleProfileEdit}>프로필 관리</button>
                        <button onClick={handleStyle}>내 스타일</button>
                    </div>
                </div>

                {/* 구매 내역 */}
                <div className="history">
                    <div className="history-header">
                        <h3>구매 내역</h3>
                        <a href="/my-page/buys-history">더보기</a>
                    </div>
                    <div className="history-status">
                        <div className="status-item">
                            <span>전체</span>
                            <strong style={{color: "#EB3333"}}>{userData.buysHistory.length}</strong>
                        </div>
                        <div className="status-item">
                            <span>입찰 중</span>
                            <strong>{BbidCount}</strong>
                        </div>

                        <div className="status-item">
                            <span>종료</span>
                            <strong>{BfinishedCount}</strong>
                        </div>
                    </div>
                    <div className="history-list">
                        {userData.buysHistory && userData.buysHistory.length > 0 ? (
                            userData.buysHistory
                                .slice(0, 3)
                                .map((item, index) => {
                                    const [productImage, productName, buyPrice, buyState] = item; // Object[]에서 값 추출
                                    return (
                                        <div className="item" key={index}>
                                            <div className="item-image">
                                                <img src={productImage} alt={productName}/>
                                            </div>
                                            <div className="item-details">
                                                <span>{productName}</span>
                                                <span>{buyPrice}원</span>
                                                <span className="status">{buyState === 0 ? '입찰 중' : '종료'}</span>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="none">
                                <p>거래 내역이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 판매 내역 */}
                <div className="history">
                    <div className="history-header">
                        <h3>판매 내역</h3>
                        <a href="/my-page/sales-history">더보기</a>
                    </div>
                    <div className="history-status">
                        <div className="status-item">
                            <span>전체</span>
                            <strong style={{color: "#06BC15"}}>{userData.salesHistory.length}</strong>
                        </div>
                        <div className="status-item">
                            <span>입찰 중</span>
                            <strong>{SbidCount}</strong>
                        </div>

                        <div className="status-item">
                            <span>종료</span>
                            <strong>{SfinishedCount}</strong>
                        </div>
                    </div>
                    <div className="history-list">
                        {userData.salesHistory && userData.salesHistory.length > 0 ? (
                            userData.salesHistory
                                .slice(0, 3)
                                .map((item, index) => {
                                    const [productImage, productName, salePrice, saleState] = item; // Object[]에서 값 추출
                                    return (
                                        <div className="item" key={index}>
                                            <div className="item-image">
                                                <img src={productImage} alt={productName}/>
                                            </div>
                                            <div className="item-details">
                                                <span>{productName}</span>
                                                <span>{salePrice}원</span>
                                                <span className="status">{saleState === 0 ? '입찰 중' : '종료'}</span>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="none">
                                <p>거래 내역이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="interest">
                    <div className="interest-header">
                        <h3>관심 상품</h3>
                        <a href="/my-page/interests">더보기</a>
                    </div>
                    <div className="interest-list">
                        {userData.interests && userData.interests.length > 0 ? (
                            userData.interests
                                .filter(item => {
                                    const [productImage, productBrand, productName, productPrice] = item; // Object[]에서 값 추출
                                    return productImage && productBrand && productName && productPrice; // 값이 모두 null이 아닐 때만 유지
                                })
                                .slice(0, 4)
                                .map((item, index) => {
                                    const [productImage, productBrand, productName, productPrice] = item; // Object[]에서 값 추출
                                    return (
                                        <div className="int-item" key={index}>
                                            <div className="int-item-image">
                                                <img src={productImage} alt={productName}/>
                                            </div>
                                            <div className="int-item-details">
                                                <p>{productBrand}</p>
                                                <p>{productName}</p>
                                                <span>{productPrice}원</span>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="none">
                                <p>거래 내역이 없습니다.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Mypage;
