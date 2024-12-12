import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import "./Mypage.css";
import "./Profile.css";
import Sidebar from "./Sidebar";

function Profile(){
    const [userData, setUserData] = useState({
        name: '',

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
                name: userResponse.data.name,
                //image
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };


    const handleUpdateField = async () => {
        try {
            const response = await axios.put('http://localhost:8080/my-page/profile', userData);
            alert('업데이트 되었습니다.');
        } catch (error) {
            console.error('업데이트 실패:', error);
            alert('업데이트 중 오류가 발생했습니다.');
        }
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
            <div className="profile">
                <h3>프로필 관리</h3>
                <hr/>
                <div className="profile-1">
                    <div className="profile-image"></div>
                    <div className="name-button">
                        <h4>{userData.name}</h4>
                        <button>이미지 변경</button>
                        <button>삭제</button>
                    </div>
                </div>
                <div className="profile-2">
                    <h4>프로필 정보</h4>

                    <div className="form">
                        <label>
                            이름
                        </label>
                        <div className="form-row">
                            <input type="text" name="name" value={userData.name} onChange={handleInputChange}/>
                            <button type="button" className="change" onClick={handleUpdateField}>
                                변경
                            </button>
                        </div>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
