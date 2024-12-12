import React, { useEffect, useState } from "react";
import "./AlarmOverlay.css";
import axios from "axios";

const AlarmOverlay = ({ onClose }) => {
    const [alarms, setAlarms] = useState([]);

    // 알림 데이터를 가져오는 함수
    useEffect(() => {
        const fetchAlarm = async () => {
            try {
                const alarmResponse = await axios.get("http://localhost:8080/api/alarm", {
                    params: { user_id: 'aaa@aaa.com' },
                });
                setAlarms(alarmResponse.data);
            } catch (error) {
                console.error("알림 데이터를 가져오는 데 실패했습니다:", error);
            }
        };
        fetchAlarm();
    }, []);

    // 알림 확인 상태를 업데이트하고 페이지 이동
    const handleAlarmClick = async (index) => {
        try {
            const updatedAlarms = [...alarms];
            updatedAlarms[index][3] = 1; // al_check 값을 1로 설정

            // 서버로 알림 상태 업데이트
            await axios.put('http://localhost:8080/api/alarm/mark-read', {
                user_id: 'aaa@aaa.com',
                al_num: updatedAlarms[index][0],
                al_check: 1,
            });

            // 상태 업데이트
            setAlarms(updatedAlarms);

            // 알림 내용에 따라 페이지 이동
            const content = updatedAlarms[index][1]; // 알림 내용
            if (content.includes("판매")) {
                window.location.href = "/my-page/sales-history"; // 판매 내역 페이지로 이동
            } else if (content.includes("구매")) {
                window.location.href = "/my-page/buys-history"; // 구매 내역 페이지로 이동
            } else if (content.includes("댓글")) {
                window.location.href = "/style";
            }
        } catch (error) {
            console.error("알림 확인 상태 업데이트에 실패했습니다:", error);
        }
    };

    return (
        <div className="alarm-overlay">
            <div className="overlay-content">
                <div className="header">
                    <button className="close-btn" onClick={onClose}>x</button>
                    <h2>알림</h2>
                </div>
                {alarms.length > 0 ? (
                    <ul className="alarm-list">
                        {alarms.map((alarm, index) => (
                            <li
                                key={index}
                                className={`alarm-item ${alarm[3] === 1 ? "read" : "unread"}`}
                                onClick={() => handleAlarmClick(index)}
                            >
                                {/* 알림 내용 */}
                                {alarm[1]}
                                <br />
                                {/* 알림 날짜 */}
                                <small>{alarm[2]}</small>
                                <br />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-alarms">현재 알림이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default AlarmOverlay;
