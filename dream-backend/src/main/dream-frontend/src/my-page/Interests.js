import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "./Mypage.css";
import "./Interests.css";
import Sidebar from "./Sidebar";

function Interests() {
    const [userData, setUserData] = useState({
        interests: [],
    });
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const [view, setView] = useState("product"); // 관심 상품과 스타일 보기 상태 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8080/my-page', {
                    params: { user_id: 'aaa@aaa.com' },
                });
                const interestsResponse = await axios.get('http://localhost:8080/my-page/interests', {
                    params: { user_id: userResponse.data.user_id },
                });

                setUserData({
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

    // 관심 상품 보기 / 스타일 보기 토글 함수
    const handleViewChange = (viewType) => {
        setView(viewType);
    };

    return (
        <div className="mypage">
            <Sidebar />
            <div className="int">
                <div className="int-header">
                    <h2>관심</h2>
                    <hr />
                    <button className="int-button" onClick={() => handleViewChange("product")}>상품</button>
                    <button className="int-button" onClick={() => handleViewChange("style")}>스타일</button>
                </div>
                <div className="interest-list">
                    {view === "product" ? (
                        userData.interests && userData.interests.length > 0 ? (
                            userData.interests
                                .filter(item => {
                                    const [productImage, productBrand, productName, productPrice] = item; // Object[]에서 값 추출
                                    return productImage && productBrand && productName && productPrice; // 값이 모두 null이 아닐 때만 유지
                                })
                                .map((item, index) => {
                                    const [productImage, productBrand, productName, productPrice] = item; // Object[]에서 값 추출
                                    return (
                                        <div className="int-item" key={index}>
                                            <div className="int-item-image">
                                                <img src={productImage} alt={productName} />
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
                            <div className="int-none">
                                <p>추가하신 관심 상품이 없습니다.</p>
                                <button>Shop 바로가기</button>
                            </div>
                        )
                    ) : (
                        userData.interests && userData.interests.length > 0 ? (
                            userData.interests
                                .filter(item => {
                                    const [, , , , styleImage] = item; // Object[]에서 값 추출
                                    return styleImage; // 값이 모두 null이 아닐 때만 유지
                                })
                                .slice(0, 4)
                                .map((item, index) => {
                                    const [, , , , styleImage] = item; // 스타일 이미지 추출
                                    return (
                                        <div className="int-item" key={index}>
                                            <div className="int-item-image">
                                                <img src={styleImage} alt={styleImage} />
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="int-none">
                                <p>추가하신 스타일이 없습니다.</p>
                                <button>Style 바로가기</button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Interests;
