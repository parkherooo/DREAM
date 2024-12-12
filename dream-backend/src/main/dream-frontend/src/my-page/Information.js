import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import "./Mypage.css";
import "./Information.css";
import Sidebar from "./Sidebar";

function Information(){
    const [userData, setUserData] = useState({
        user_id: '',
        pwd: '',
        phone: '',
        shoes: '',
    });
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
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

            setUserData({
                user_id: userResponse.data.user_id,
                pwd: userResponse.data.pwd,
                phone: userResponse.data.phone,
                shoes: userResponse.data.shoes,
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

    // 입력값 변경 시 userData 상태 직접 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };


    const handleUpdateField = async () => {
        try {
            const response = await axios.put('http://localhost:8080/my-page/information', userData);
            alert('업데이트 되었습니다.');
        } catch (error) {
            console.error('업데이트 실패:', error);
            alert('업데이트 중 오류가 발생했습니다.');
        }
    };

    const handleModalConfirm = async () => {
        try {
            await axios.put('http://localhost:8080/my-page/information', {
                ...userData,
                shoes: selectedValue, // 선택된 신발 사이즈를 전송
            });
            setUserData({ ...userData, shoes: selectedValue }); // 상태 업데이트
            alert('업데이트 되었습니다.');
            handleModalClose(); // 모달 닫기
        } catch (error) {
            console.error('신발 사이즈 업데이트 실패:', error);
            alert('업데이트 중 오류가 발생했습니다.');
        }
    };


    const togglePasswordVisibility = () => {
        const passwordInput = document.querySelector('input[name="pwd"]');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [modalField, setModalField] = useState(''); // 어떤 필드인지 저장
    const [selectedValue, setSelectedValue] = useState(''); // 선택된 값 저장


    const handleModalOpen = (field) => {
        setModalField(field); // 필드 저장
        setIsModalOpen(true); // 모달 열기
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!isLoggedIn) {
        navigate("/login");
    }

    return (
        <div className="mypage">
            <Sidebar/>
            <div className="information">
                <h3>로그인 정보</h3>
                <hr/>
                <div className="login">
                    <h4>내 계정</h4>
                    <div className="form">
                        <label>
                            이메일 주소
                        </label>
                        <div className="form-row">
                            <input type="text" name="user_id" value={userData.user_id} readOnly/>
                        </div>
                        <hr/>
                    </div>

                    <div className="form">
                        <label>
                            비밀번호
                        </label>
                        <div className="form-row">
                            <input type="password" name="pwd" value={userData.pwd} onChange={handleInputChange}/>
                            <button type="button" className="eye" onClick={togglePasswordVisibility}>👁️</button>
                            <button type="button" className="change" onClick={() => handleUpdateField}>
                                변경
                            </button>
                        </div>
                        <hr/>
                    </div>
                </div>
                <div className="personal">
                    <h4>개인 정보</h4>
                    <div className="form">
                        <label>
                            휴대폰 번호
                        </label>
                        <div className="form-row">
                            <input type="text" name="phone" value={userData.phone} onChange={handleInputChange}/>
                            <button type="button" className="change" onClick={handleUpdateField}>
                                변경
                            </button>
                        </div>
                        <hr/>
                    </div>
                    <div className="form">
                        <label>
                            신발 사이즈
                        </label>
                        <div className="form-row">
                            <input type="text" name="shoes" value={userData.shoes} onChange={handleInputChange}/>

                            <button type="button" className="change" onClick={() => handleModalOpen('shoes')}>
                                변경
                            </button>
                            {/* 모달 창 */}
                            {isModalOpen && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <h2>사이즈 변경</h2>
                                        {/* 숫자 버튼 */}
                                        {[220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedValue(size)} // 클릭한 값을 상태에 저장
                                                className={selectedValue === size ? 'selected' : ''} // 선택된 값 강조
                                            >
                                                {size}
                                            </button>
                                        ))}

                                        {/* 확인/취소 버튼 */}
                                        <div style={{marginTop: '20px'}}>
                                            <button onClick={handleModalConfirm}>확인</button>
                                            <button onClick={handleModalClose}>닫기</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <hr/>
                    </div>
                </div>
                <div className="delete">
                    <a href="/my-page/delete">회원탈퇴</a>
                </div>
            </div>
        </div>
    );
}

export default Information;