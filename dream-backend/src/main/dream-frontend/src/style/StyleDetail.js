import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StyleDetail.css";

const StyleDetail = () => {
    const { st_num } = useParams();
    const navigate = useNavigate();
    const [style, setStyle] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user_id, setUser_id] = useState(null);

    // 세션 확인 함수
    const checkSession = async () => {
        try {
            const response = await axios.get('http://localhost:8080/check-session', { withCredentials: true });
            if (response.data.user_id) {
                setIsLoggedIn(true);
                setUser_id(response.data.user_id);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("세션 확인 오류:", error);
        }
    };

    // 댓글 목록 가져오기
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/StyleComment/${st_num}`);
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    // 댓글 작성하기
    const handleCommentSubmit = async () => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        if (!newComment.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/StyleComment",
                { st_num, cm_content: newComment },
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert("댓글이 등록되었습니다.");
                setNewComment("");
                fetchComments(); // 댓글 목록 갱신
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
            alert("댓글 등록 중 오류가 발생했습니다.");
        }
    };

    // 스타일 상세 데이터 불러오기
    useEffect(() => {
        checkSession();
        const fetchStyleDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/StyleDetail/${st_num}`);
                setStyle(response.data);
            } catch (error) {
                console.error("Error fetching style detail:", error);
            }
        };

        fetchStyleDetail();
        fetchComments();
    }, [st_num]);

    const handleStyleUpdate = () => {
        if (style && style.user_id === user_id) {
            // 스타일 수정 페이지로 이동
            navigate(`/StyleUpdate/${st_num}`);
        }
    };

    const handleStyleDelete = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/StyleDelete/${st_num}`, { withCredentials: true });
                if (response.status === 200) {
                    alert("게시글이 삭제되었습니다.");
                    navigate("/StyleList"); // 스타일 목록 페이지로 이동
                }
            } catch (error) {
                console.error("Error deleting style:", error);
                alert("게시글 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    if (!style) {
        return <p>Loading...</p>;
    }

    const imageList = style.image ? style.image.split(",").map((img) => img.trim()) : [];

    return (
        <div className="style-detail">
            <h2>STYLE</h2>
            <hr className="style-detail-hr"/>
            <div className="style-detail-content">
                <div className="style-detail-header">
                    <p>{style.user_id}</p>
                </div>

                <div className="image-slider">
                    {imageList.length > 1 && (
                        <button className="image-slider-left"
                                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))}>
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
                        <button className="image-slider-right"
                                onClick={() => setCurrentImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))}>
                            ＞
                        </button>
                    )}
                </div>
                <div>
                    <p>{style.st_content}</p>
                    <p>
                    <span
                        className="heart-icon"
                        onClick={async () => {
                            // 좋아요 로직
                        }}
                        style={{cursor: "pointer"}}
                    >
                        {style.isLiked ? "♥" : "♡"} {style.ht_count}
                    </span>
                    </p>
                </div>
                <div className="style-detail-hashtag">
                    {style.hashtag.split('#').slice(1).map((hashtag, index) => (
                        <a key={index} href={`/StyleList?hashtag=${hashtag}`} className="hashtag-link">
                            #{hashtag}
                        </a>
                    ))}
                </div>

                {/* 게시글 수정/삭제 버튼 */}
                {style.user_id === user_id && (
                    <div>
                        <button className="edit" onClick={handleStyleUpdate}>수정</button>
                        <button className="delete" onClick={handleStyleDelete}>삭제</button>
                    </div>
                )}

                {/* 댓글 목록 */}
                <div className="comments-section">
                    <h3>댓글</h3>
                    <ul className="comments-list">
                        {comments.map((comment, index) => (
                            <li key={index}>
                                <p>
                                    <strong>{comment.user_id}</strong>: {comment.cm_content}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {/* 댓글 작성 */}
                    <div className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요"
                    ></textarea>
                        <button onClick={handleCommentSubmit}>댓글 작성</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StyleDetail;
