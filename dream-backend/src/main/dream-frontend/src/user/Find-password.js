import React, { useState } from "react";
import axios from "axios";
import "./Find-password.css";
const FindPassword = () => {
    const [userId, setUserId] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [step, setStep] = useState(1);  // 1: 아이디/전화번호 입력, 2: 인증 코드 입력, 3: 비밀번호 재설정

    const handleFindPassword = async () => {
        if (!userId || !phone) {
            setMessage("아이디와 전화번호를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.get("http://localhost:8080/Find-password", {
                params: { user_id: userId, phone },
            });

            if (response.status === 200) {
                setMessage("인증 코드가 전송되었습니다.");
                setStep(2);  // 인증 코드 입력 단계로 전환
            } else {
                setMessage("오류: " + response.data);
            }
        } catch (error) {
            setMessage("서버와의 연결에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="container1">
            <h1>비밀번호 찾기</h1>
            {step === 1 && (
                <div className="form-container1">
                    <div className="form-group1">
                        <label htmlFor="user_id">아이디:</label>
                        <input
                            type="text"
                            id="user_id"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="phone">전화번호:</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <button onClick={handleFindPassword} className="submit-btn1">
                        비밀번호 찾기
                    </button>
                    {message && <p className="message1">{message}</p>}
                </div>
            )}

            {step === 2 && <ResetPasswordForm userId={userId} />}
        </div>
    );
};

const ResetPasswordForm = ({ userId }) => {
    const [inputCode, setInputCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        if (!inputCode || !newPassword) {
            setMessage("인증 코드와 새 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/Reset-password", null, {
                params: {
                    email: userId,
                    inputCode,
                    newPassword
                }
            });

            if (response.status === 200) {
                setMessage("비밀번호가 재설정되었습니다.");
                window.location.href = "/Login";
            } else {
                setMessage("오류: " + response.data);
            }
        } catch (error) {
            setMessage("서버와의 연결에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="form-container1">
            <h2>인증 코드 입력</h2>
            <div className="form-group1">
                <label htmlFor="inputCode">인증 코드:</label>
                <input
                    type="text"
                    id="inputCode"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    required
                />
            </div>
            <div className="form-group1">
                <label htmlFor="newPassword">새 비밀번호:</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <button onClick={handleResetPassword} className="submit-btn1">
                비밀번호 재설정
            </button>
            {message && <p className="message1">{message}</p>}
        </div>
    );
};

export default FindPassword;
