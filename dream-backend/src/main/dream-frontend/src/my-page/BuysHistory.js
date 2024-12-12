import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Mypage.css";
import "./History.css";
import Sidebar from "./Sidebar";

function BuysHistory() {
    const [userData, setUserData] = useState({
        buysHistory: [],
    });
    const [loading, setLoading] = useState(true);
    const [currentFilter, setCurrentFilter] = useState(null); // 필터 상태: null은 전체 표시
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const navigate = useNavigate();

    // 세션 확인 함수
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

    // 사용자 데이터 가져오는 함수
    const fetchUserData = async (userId) => {
        try {
            const buysResponse = await axios.get(
                "http://localhost:8080/my-page/buys-history",
                {
                    params: { user_id: userId }, // 세션에서 받은 user_id로 데이터 요청
                }
            );

            setUserData({
                buysHistory: buysResponse.data, // 구매 내역
            });
            setLoading(false);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession(); // 컴포넌트가 로드될 때 세션 확인
    }, []);

    // 상태별 개수 계산
    const bidCount = userData.buysHistory.filter(item => item[4] === 0).length;
    const finishedCount = userData.buysHistory.filter(item => item[4] === 1).length;

    // 현재 필터링된 데이터
    const filteredHistory =
        currentFilter === null
            ? userData.buysHistory
            : userData.buysHistory.filter(item => item[4] === currentFilter);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!isLoggedIn) {
        navigate("/login");
    }

    return (
        <div className="mypage">
            <Sidebar />
            <div className="hist">
                <h3>구매 내역</h3>
                <div className="hist-menu">
                    <div
                        className="menu-item"
                        onClick={() => setCurrentFilter(0)} // 필터링 상태 변경
                    >
                        <span>입찰 중</span>
                        <strong>{bidCount}</strong>
                    </div>
                    <div
                        className="menu-item"
                        onClick={() => setCurrentFilter(1)} // 필터링 상태 변경
                    >
                        <span>종료</span>
                        <strong>{finishedCount}</strong>
                    </div>
                </div>
                {filteredHistory.length > 0 ? (
                    filteredHistory.map((item, index) => {
                        const [productNum, productImage, productName, buyPrice, buyState] = item; // 데이터 추출
                        const stateText = buyState === 0 ? "입찰 중" : "종료";
                        const handleProduct = () => {
                            navigate(`/shop/product/${productNum}`);
                        };
                        return (
                            <div className="hist-hr" key={index}>
                                <div className="item" onClick={handleProduct}>
                                    <div className="item-image">
                                        <img src={`/product_img/${productImage}`} alt={productImage} />
                                    </div>
                                    <div className="item-details">
                                        <span>{productName}</span>
                                        <span>{buyPrice}원</span>
                                        <span>{stateText}</span>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        );
                    })
                ) : (
                    <div className="history-none">
                        <p>거래 내역이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BuysHistory;
