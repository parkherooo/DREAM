import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useNavigate} from "react-router-dom";
function SignUp() {
    const [userData, setUserData] = useState({
        user_id: '',
        pwd: '',
        shoes: ''
    });

    const [formErrors, setFormErrors] = useState({
        user_id: '',
        pwd: '',
        shoes: ''
    });

    const navigate = useNavigate();

    // 입력값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });

        // 입력 유효성 검사
        validateField(name, value);
    };

    // 유효성 검사 함수
    const validateField = (name, value) => {
        const errors = { ...formErrors };

        if (name === 'user_id') {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            errors.user_id = emailPattern.test(value) ? '' : '유효한 이메일 주소를 입력해주세요.';
        }

        if (name === 'pwd') {
            errors.pwd = value.length >= 8 && value.length <= 16 ? '' : '비밀번호는 8~16자로 입력해주세요.';
        }

        if (name === 'shoes') {
            errors.shoes = value > 0 ? '' : '신발 사이즈를 입력해주세요.';
        }

        setFormErrors(errors);
    };

    // 폼 유효성 검사
    const isFormValid = () => {
        return (
            userData.user_id &&
            userData.pwd &&
            userData.shoes &&
            !formErrors.user_id &&
            !formErrors.pwd &&
            !formErrors.shoes
        );
    };

    // 폼 제출 처리
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert('입력한 정보를 확인해주세요.');
            return;
        }

        // shoes를 int로 변환
        const requestData = {
            ...userData,
            shoes: parseInt(userData.shoes, 10),
        };

        axios.post('http://localhost:8080/SignUp', requestData)
            .then((response) => {
                console.log(response.data);
                alert('회원가입 성공!');
                navigate('/Login');
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    // 서버에서의 응답 에러 처리
                    alert(error.response.data); // 서버에서 전송한 에러 메시지
                } else if (error.request) {
                    // 요청이 전송되었으나 응답이 없는 경우
                    alert('서버 응답 없음. 다시 시도해주세요.');
                } else {
                    // 다른 에러 처리
                    alert('에러 발생: ' + error.message);
                }
            });
    };


    return (
        <div className="container">
            <div className="signup-box">
                <h2>회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="user_id">이메일 주소*</label>
                        <input
                            type="text"
                            id="user_id"
                            name="user_id"
                            value={userData.user_id}
                            onChange={handleChange}
                            placeholder="예)dream@dream.co.kr"
                        />
                        {formErrors.user_id && <span className="error">{formErrors.user_id}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="pwd">비밀번호</label>
                        <input
                            type="password"
                            id="pwd"
                            name="pwd"
                            value={userData.pwd}
                            onChange={handleChange}
                            placeholder="영문, 숫자, 특수문자 조합 8-16자 "
                        />
                        {formErrors.pwd && <span className="error">{formErrors.pwd}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="shoes">신발 사이즈</label>
                        <input
                            type="number"
                            id="shoes"
                            name="shoes"
                            value={userData.shoes}
                            onChange={handleChange}
                            placeholder="예: 260"
                        />
                        {formErrors.shoes && <span className="error">{formErrors.shoes}</span>}
                    </div>

                    <div className="submit-btn">
                        <button type="submit" disabled={!isFormValid()}>본인 인증하고 가입하기</button>
                    </div>
                </form>

            </div>

        </div>
    );
}

export default SignUp;
