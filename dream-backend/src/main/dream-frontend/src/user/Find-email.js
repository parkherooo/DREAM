import React, { useState } from "react";
import axios from "axios";

const FindEmail = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult("");
        setError("");

        try {
            const response = await axios.get("http://localhost:8080/Find-email", {
                params: { name, phone },
            });

            setResult(response.data); // 서버에서 받은 메시지 출력
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data); // 서버 에러 메시지 출력
            } else {
                setError("요청 중 문제가 발생했습니다.");
            }
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>아이디 찾기</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>이름:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름 입력"
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>전화번호:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="전화번호 입력"
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
                    아이디 찾기
                </button>
            </form>
            {result && <p style={{ color: "green" }}>{result}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default FindEmail;
