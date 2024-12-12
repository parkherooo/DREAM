import React, { useEffect } from 'react';

const NaverLogin = () => {
    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: 'brSfM5h52FlNz8aesNXC', // 네이버 개발자 센터에서 발급받은 클라이언트 ID
            callbackUrl: 'http://localhost:8080/naver/callback', // Spring Boot 백엔드 콜백 URL
            isPopup: false,
            loginButton: { color: 'green', type: 3, height: 50 }, // 로그인 버튼 스타일
        });
        naverLogin.init();
    }, []);

    return (
        <div>
            <div id="naverIdLogin" />
        </div>
    );
};

export default NaverLogin;
