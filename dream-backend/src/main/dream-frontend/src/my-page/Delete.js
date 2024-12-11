import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "./Mypage.css";
import "./Delete.css";
import Sidebar from "./Sidebar";

function Delete() {
    const [userData, setUserData] = useState({
        user_id: '',
    });
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8080/my-page', {
                    params: { user_id: 'test@aaa.com' },
                });

                setUserData({
                    user_id: userResponse.data.user_id,
                });
                setLoading(false);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const [checkboxes, setCheckboxes] = useState({
        terms1: false,
        terms2: false,
        terms3: false,
    }); // 다중 체크박스 상태

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxes((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 기본 동작을 막음

        // 모든 체크박스가 체크되지 않으면 경고 메시지 출력
        if (!checkboxes.terms1 || !checkboxes.terms2 || !checkboxes.terms3) {
            alert("회원탈퇴를 진행하려면 모든 체크박스를 체크해 주세요.");
        } else {
            alert("회원탈퇴 요청이 접수되었습니다.");

            // 체크박스가 모두 체크되었을 경우, 서버로 요청 보내기
            // 서버로 데이터 전송 (예시: axios 사용)
            axios.post('/my-page/delete', {
                user_id: userData.user_id,
            })
                .then(response => {
                    alert(response.data); // 응답 메시지 출력
                })
                .catch(error => {
                    console.error('회원탈퇴 실패:', error);
                    alert('회원탈퇴 실패');
                });
        }
    };

    const handleInfo = () => {
        navigate('/my-page/information');
    };

    return (
        <div className="mypage">
            <Sidebar />
            <div className="delete-user">
                <h2>회원탈퇴</h2>
                <h4>회원탈퇴에 앞서 아래 내용을 반드시 확인해 주세요.</h4>
                <form action="/my-page/delete" method="post" onSubmit={handleSubmit}>
                    <div className="box">
                        <label><input type="checkbox" name="terms1" checked={checkboxes.terms1} onChange={handleCheckboxChange} /> DREAM을 탈퇴하면 회원
                            정보 및 서비스 이용 기록이 삭제됩니다.</label>
                        <li>내 프로필, 거래내역(구매/판매), 관심상품, 보유상품, STYLE 게시물(게시물/댓글) 등 사용자의 모든 정보가 사라지며 재가입 하더라도 복구가 불가능합니다.</li>
                        <br />

                        <label><input type="checkbox" name="terms2" checked={checkboxes.terms2} onChange={handleCheckboxChange} /> DREAM 탈퇴가 제한된
                            경우에는 아래 내용을 참고하시기 바랍니다.</label>
                        <li>진행 중인 거래(판매/구매)가 있을 경우: 해당 거래 종료 후 탈퇴 가능</li>
                        <li>진행 중인 입찰(판매/구매)가 있을 경우: 해당 입찰 삭제 후 탈퇴 가능</li>
                        <br />

                    </div>
                    <label><input type="checkbox" name="terms3" checked={checkboxes.terms3} onChange={handleCheckboxChange} /> 회원탈퇴 안내를 모두 확인하였으며 탈퇴에 동의합니다.</label>
                    <div className="button">
                        <button type="submit" className="delete-submit">탈퇴하기</button>
                        <button onClick={handleInfo} className="cancel">취소하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Delete;
