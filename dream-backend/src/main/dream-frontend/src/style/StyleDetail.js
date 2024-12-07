import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StyleDetail.css";
const StyleDetail = () => {
    const { st_num } = useParams();
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
    const [style, setStyle] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    const handleEdit = () => {
        // 수정 페이지로 이동
        navigate(`/StyleUpdate/${st_num}`);
    };

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
            <p>♡ {style.ht_count}</p>
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
