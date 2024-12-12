import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Mypage.css";
import "./History.css";
import Sidebar from "./Sidebar";

function SalesHistory() {
    const [userData, setUserData] = useState({
        salesHistory: [],
    });
    const [loading, setLoading] = useState(true);
    const [currentFilter, setCurrentFilter] = useState(null); // 필터 상태: null은 전체 표시
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8080/my-page', {
                    params: { user_id: 'aaa@aaa.com'},
                });
                const salesResponse = await axios.get(
                    "http://localhost:8080/my-page/sales-history",
                    {
                        params: { user_id: userResponse.data.user_id },
                    }
                );

                setUserData({
                    salesHistory: salesResponse.data, // 판매 내역
                });
                setLoading(false);
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // 상태별 개수 계산
    const bidCount = userData.salesHistory.filter(item => item[4] === 0).length;
    const finishedCount = userData.salesHistory.filter(item => item[4] === 1).length;

    // 현재 필터링된 데이터
    const filteredHistory =
        currentFilter === null
            ? userData.salesHistory
            : userData.salesHistory.filter(item => item[4] === currentFilter);

    return (
        <div className="mypage">
            <Sidebar/>
            <div className="hist">
                <h3>판매 내역</h3>
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
                        const [productNum, productImage, productName, salePrice, saleState] = item; // 데이터 추출
                        const stateText = saleState === 0 ? "입찰 중" : "종료";
                        const handleProduct = () => {
                            navigate(`/shop/product/${productNum}`);
                        };
                        return (
                            <div className="hist-hr">
                            <div className="item" key={index} onClick={handleProduct}>
                                <div className="item-image">
                                    <img src={`/product_img/${productImage}`} alt={productImage} />
                                </div>
                                <div className="item-details">
                                    <span>{productName}</span>
                                    <span>{salePrice}원</span>
                                    <span>{stateText}</span>
                                </div>
                            </div>
                            <hr/>
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

export default SalesHistory;
