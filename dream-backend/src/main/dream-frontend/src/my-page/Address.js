import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Mypage.css";
import "./Address.css";
import Sidebar from "./Sidebar";

function Address() {
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [newAddress, setNewAddress] = useState(''); // 새 주소 값 상태
    const [postcode, setPostcode] = useState(''); // 우편번호 상태
    const [detailAddress, setDetailAddress] = useState(''); // 상세 주소 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        // Daum 주소 API 스크립트 동적 로딩
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        // 사용자 데이터 가져오기
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8080/my-page', {
                    params: { user_id: 'aaa@aaa.com' },
                });

                setUserData({
                    user_id: userResponse.data.user_id,
                    name: userResponse.data.name,
                    phone: userResponse.data.phone,
                    address: userResponse.data.address,
                });
                setLoading(false);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
                setLoading(false);
            }
        };

        fetchUserData();

        // 클린업: 컴포넌트 언마운트 시 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    const handleAddressChange = (e) => {
        setNewAddress(e.target.value);
    };

    const handleSaveAddress = async () => {
        try {
            // 주소 포맷: (우편번호) 주소 상세주소
            const fullAddress = `(${postcode}) ${newAddress} ${detailAddress}`;

            // 새 주소로 업데이트 요청
            await axios.put('http://localhost:8080/my-page/address', userData);

            // userData 업데이트
            setUserData({ ...userData, address: fullAddress });
            setIsEditing(false); // 수정 모드 종료
            handleModalClose();
            alert('주소가 업데이트되었습니다.');
        } catch (error) {
            console.error('주소 업데이트 실패:', error);
        }
    };

    // Daum 주소 API 호출
    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 우편번호와 주소를 필드에 자동으로 입력
                setPostcode(data.zonecode); // 우편번호
                setNewAddress(data.address); // 기본 주소
                setIsEditing(true); // 수정 모드 시작
            }
        }).open();
    };

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    const handleModalOpen = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <div className="mypage">
            <Sidebar />
            <div className="add-header">
                <h3>주소록</h3>
                <div className="add-body">
                    <div className="add-content">
                        <p>{userData.name}</p>
                        <p>{userData.phone}</p>
                        {/* 주소 수정 후, 업데이트된 주소를 표시 */}
                        <p>{userData.address}</p>
                    </div>
                    <div className="add-button">
                        <button onClick={handleModalOpen}>수정</button>
                        {/* 모달 창 */}
                        {isModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h4>주소</h4>
                                    <input
                                        type="text"
                                        value={postcode}
                                        readOnly
                                        placeholder="우편번호"
                                    />
                                    <button onClick={handleSearchAddress}>우편 번호 찾기</button>
                                    <input
                                        type="text"
                                        value={newAddress}
                                        readOnly
                                        placeholder="주소"
                                    />
                                    <input
                                        type="text"
                                        value={detailAddress}
                                        onChange={(e) => setDetailAddress(e.target.value)}
                                        placeholder="상세 주소"
                                    />
                                    {/* 확인/취소 버튼 */}
                                    <div style={{ marginTop: '20px' }}>
                                        <button onClick={handleSaveAddress}>확인</button>
                                        <button onClick={handleModalClose}>닫기</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button>삭제</button>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default Address;
