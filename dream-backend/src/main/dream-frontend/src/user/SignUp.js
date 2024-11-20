import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
    const [userData, setUserData] = useState({
        userId: '',
        name: '',
        pwd: '',
        birth: '',
        phone: '',
        loginPlatform: '',
        shoes: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/SignUp', userData)
            .then(response => {
                console.log(response.data);
                alert('회원가입 성공');
            })
            .catch(error => {
                console.error(error);
                alert('회원가입 실패');
            });
    };

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    아이디:
                    <input type="text" name="userId" value={userData.userId} onChange={handleChange} />
                </label>
                <label>
                    이름:
                    <input type="text" name="name" value={userData.name} onChange={handleChange} />
                </label>
                <label>
                    비밀번호:
                    <input type="password" name="pwd" value={userData.pwd} onChange={handleChange} />
                </label>
                <label>
                    생년월일:
                    <input type="text" name="birth" value={userData.birth} onChange={handleChange} />
                </label>
                <label>
                    전화번호:
                    <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
                </label>
                <label>
                    로그인 플랫폼:
                    <input type="text" name="loginPlatform" value={userData.loginPlatform} onChange={handleChange} />
                </label>
                <label>
                    신발 사이즈:
                    <input type="number" name="shoes" value={userData.shoes} onChange={handleChange} />
                </label>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default SignUp;
