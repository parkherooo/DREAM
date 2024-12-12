import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StyleDetail.css";

const StyleDetail = () => {
    const { st_num } = useParams();
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
    const [style, setStyle] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 스타일 상세 데이터 불러오기
    useEffect(() => {
        const fetchStyleDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/StyleDetail/${st_num}`);
                setStyle(response.data);
            } catch (error) {
                console.error("Error fetching style detail:", error);
            }
        };

        fetchStyleDetail();
    }, [st_num]);

    if (!style) {
        return <p>Loading...</p>;
    }

    const imageList = style.image ? style.image.split(",").map((img) => img.trim()) : [];

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
        );
    };

    // 수정 페이지로 이동
    const handleEdit = () => {
        navigate(`/StyleUpdate/${st_num}`);
    };

    // 삭제 처리
    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/StyleDelete/${st_num}`);
            alert("게시글이 삭제되었습니다.");
            navigate("/StyleList"); // 삭제 후 리스트 페이지로 이동
        } catch (error) {
            console.error("Error deleting style:", error);
            alert("게시글 삭제 중 오류가 발생했습니다.");
        }
    };

    // 하트 클릭 이벤트 처리
    const handleHeartClick = async () => {
        try {
            const checkResponse = await axios.get("http://localhost:8080/StyleHeartCheck", {
                params: { st_num },
                withCredentials: true,
            });

            if (checkResponse.data) {
                // 좋아요가 이미 눌린 상태라면 취소
                const response = await axios.post("http://localhost:8080/StyleHeartDown", null, {
                    params: { st_num },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    alert("좋아요가 취소되었습니다.");
                    // 좋아요 취소 상태 업데이트
                    setStyle((prevStyle) => ({
                        ...prevStyle,
                        isLiked: false,
                        ht_count: prevStyle.ht_count - 1,
                    }));
                }
            } else {
                // 좋아요가 눌리지 않은 상태라면 좋아요 추가
                const response = await axios.post("http://localhost:8080/StyleHeart", null, {
                    params: { st_num },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    alert("좋아요가 반영되었습니다.");
                    // 좋아요 상태 업데이트
                    setStyle((prevStyle) => ({
                        ...prevStyle,
                        isLiked: true,
                        ht_count: prevStyle.ht_count + 1,
                    }));
                }
            }
        } catch (error) {
            console.error("Error processing heart click:", error);
            alert("좋아요를 처리할 수 없습니다.");
        }
    };

    return (
        <div className="style-detail">
            <p>{style.user_id}</p>

            <div className="image-slider">
                {imageList.length > 1 && (
                    <button onClick={handlePrevImage} className="prev-button">
                        ＜
                    </button>
                )}

                {imageList.length > 0 && (
                    <img
                        src={`http://localhost:8080/images/style/${imageList[currentImageIndex]}`}
                        alt={`${style.title} ${currentImageIndex + 1}`}
                        className="style-detail-image"
                    />
                )}

                {imageList.length > 1 && (
                    <button onClick={handleNextImage} className="next-button">
                        ＞
                    </button>
                )}
            </div>

            <div className="image-indicator">
                {imageList.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator-dot ${index === currentImageIndex ? "active" : ""}`}
                    ></div>
                ))}
            </div>

            <p>{style.st_content}</p>
            <p>
                <span
                    className="heart-icon"
                    onClick={handleHeartClick}
                    style={{ cursor: "pointer" }}
                >
                    {style.isLiked ? "♥" : "♡"} {style.ht_count}
                </span>
            </p>
            <p>{style.hashtag}</p>

            <div className="style-detail-buttons">
                <button className="edit-button" onClick={handleEdit}>
                    수정
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    삭제
                </button>
            </div>
        </div>
    );
};

export default StyleDetail;
