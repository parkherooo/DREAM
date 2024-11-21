import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
    const [userData, setUserData] = useState({
        userId: '',
        pwd: '',
    });
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const location = useLocation(); // 현재 경로 정보를 얻는 훅
    // 이전 경로 가져오기 (이전 경로가 없을 경우 기본값으로 '/')
    const previousPath = location.state?.from || "/";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/Login', userData)
            .then(response => {
                console.log(response.data);
                navigate(previousPath);
            })
            .catch(error => {
                console.error(error);
                alert('로그인 정보를 확인하세요');
            });
    };

    return (
        <div>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    아이디:
                    <input type="text" name="userId" value={userData.userId} onChange={handleChange} />
                </label>
                <label>
                    비밀번호:
                    <input type="password" name="pwd" value={userData.pwd} onChange={handleChange} />
                </label>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default Login;
