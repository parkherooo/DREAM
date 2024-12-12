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
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                //const userResponse = await axios.get('http://localhost:8080/my-page');
                const userResponse = await axios.get('http://localhost:8080/my-page', {
                    params: { user_id: 'aaa@aaa.com'},
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

        fetchUserData();
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
