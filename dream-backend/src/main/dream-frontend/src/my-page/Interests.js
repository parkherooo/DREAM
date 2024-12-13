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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const checkSession = async () => {
        try {
            const response = await axios.get('http://localhost:8080/check-session', { withCredentials: true });
            if (response.data.user_id) {
                setIsLoggedIn(true);
                fetchUserData(response.data.user_id); // 세션에서 받은 user_id로 유저 정보 가져오기
            } else {
                setIsLoggedIn(false);
                setLoading(false);
            }
        } catch (error) {
            console.error("세션 확인 오류:", error);
            setLoading(false);
        }
    };

    const fetchUserData = async (user_id) => {
        try {
            const userResponse = await axios.get('http://localhost:8080/my-page', {
                params: { user_id: user_id },
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

    useEffect(() => {
        checkSession(); // 컴포넌트가 로드될 때 세션 확인
    }, []);


    // 관심 상품 보기 / 스타일 보기 토글 함수
    const handleViewChange = (viewType) => {
        setView(viewType);
    };

    const handleStyle = () => {
        navigate('/style'); // 스타일 페이지로 이동
    };
    const handleShop = () => {
        navigate('/shop'); // 스타일 페이지로 이동
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!isLoggedIn) {
        navigate("/login");
    }

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
                        userData.interests && userData.interests.length > 0 &&
                        userData.interests.some(item => {
                            const [productNum, productImage, productBrand, productName, productPrice] = item; // Object[]에서 값 추출
                            return productNum && productImage && productBrand && productName && productPrice;
                        })? (
                            userData.interests
                                .filter(item => {
                                    const [productNum, productImage, productBrand, productName, productPrice] = item; // Object[]에서 값 추출
                                    return productNum && productImage && productBrand && productName && productPrice; // 값이 모두 null이 아닐 때만 유지
                                })
                                .map((item, index) => {
                                    const [productNum, productImage, productBrand, productName, productPrice] = item; // Object[]에서 값 추출
                                    const handleProduct = () => {
                                        navigate(`/shop/product/${productNum}`);
                                    };
                                    return (
                                        <div className="int-item" key={index} onClick={handleProduct}>
                                            <div className="int-item-image">
                                                <img src={`/product_img/${productImage}`} alt={productImage} />
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
                                <button onClick={handleShop}>Shop 바로가기</button>
                            </div>
                        )
                    ) : (
                        userData.interests && userData.interests.length > 0 &&
                        userData.interests.some(item => {
                            const [, , , , , styleNum, styleImage] = item;
                            return styleNum && styleImage; // 둘 다 존재하는 항목이 하나라도 있는지 확인
                        })? (
                            userData.interests
                                .filter(item => {
                                    const [, , , , , styleNum, styleImage] = item; // Object[]에서 값 추출
                                    return styleNum && styleImage; // 값이 모두 null이 아닐 때만 유지
                                })
                                .slice(0, 4)
                                .map((item, index) => {
                                    const [, , , , , styleNum, styleImage] = item; // 스타일 이미지 추출
                                    const handleStyle = () => {
                                        navigate(`/StyleDetail/${styleNum}`);
                                    };
                                    return (
                                        <div className="int-item" key={index} onClick={handleStyle}>
                                            <div className="int-item-image">
                                                <img src={`http://localhost:8080/images/style/${styleImage}`}
                                                     alt={styleImage}/>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="int-none">
                                <p>추가하신 관심 스타일이 없습니다.</p>
                                <button onClick={handleStyle}>Style 바로가기</button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Interests;
