import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

function Login() {
    const [userData, setUserData] = useState({
        user_id: '',
        pwd: '',
    });
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const location = useLocation(); // 현재 경로 정보를 얻는 훅
    const previousPath = location.state?.from || "/"; // 이전 경로 가져오기

    // 이메일 유효성 검사 (정규 표현식)
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 이메일 유효성 검사
        if (name === 'user_id') {
            if (!isValidEmail(value)) {
                setEmailError('이메일 형식으로 입력해주세요.');
            } else {
                setEmailError('');  // 유효한 이메일이면 오류 메시지 제거
            }
        }

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
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
                alert('로그인 정보를 확인하세요');
            });
    };

    const isFormValid = userData.user_id && userData.pwd && !emailError;

    return (
        <div className="login-container">
            <header className="login-header">
                <h2>DREAM</h2>
                <p>KICKS RULE EVERYTHING AROUND ME</p>
            </header>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">이메일 주소</label>
                    <input
                        type="text"
                        name="user_id"
                        value={userData.user_id}
                        onChange={handleChange}
                        placeholder="예) dream@dream.com"
                        required
                        className={emailError ? 'error' : ''}
                    />
                    {emailError && <span className="error-message">{emailError}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        name="pwd"
                        value={userData.pwd}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`login-btn ${isFormValid ? 'active' : ''}`}
                    disabled={!isFormValid}
                >
                    로그인
                </button>
            </form>
            <div className="additional-links">
                <a href="/SignUp">이메일 가입</a>
                <a href="/Find-email">이메일 찾기</a>
                <a href="/Find-password">비밀번호 찾기</a>
            </div>

            <div className="social-login">
                <button className="naver-login-btn" onClick={handleNaverLogin}>
                    N 네이버로 로그인
                </button>
            </div>
        </div>
    );
}

const handleNaverLogin = () => {
    const clientId = 'brSfM5h52FlNz8aesNXC';
    const redirectUri = encodeURIComponent('http://localhost:8080/naver/callback');
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=STATE_STRING`;
    window.location.href = naverAuthUrl;
};
export default Login;

