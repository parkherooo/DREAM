import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StyleDetail.css";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

const StyleDetail = () => {
    const { st_num } = useParams();
    const navigate = useNavigate();
    const [style, setStyle] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user_id, setUser_id] = useState(null);
    const [isMarked, setIsMarked] = useState(false);  // 마킹 상태 관리
    const [isLiked, setIsLiked] = useState(false);  // 좋아요 상태 관리

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

        // 스타일 마킹 상태 확인
        const checkMarkStatus = async () => {
            try {
                const response = await axios.get("http://localhost:8080/MarkCheck", {
                    params: { st_num },
                    withCredentials: true,
                });
                setIsMarked(response.data); // 마킹 상태 업데이트
            } catch (error) {
                console.error("스타일 마킹 상태 확인 오류:", error);
            }
        };

        // 좋아요 상태 확인
        const checkHeartStatus = async () => {
            try {
                const response = await axios.get("http://localhost:8080/StyleHeartCheck", {
                    params: { st_num },
                    withCredentials: true,
                });
                setIsLiked(response.data); // 좋아요 상태 업데이트
            } catch (error) {
                console.error("좋아요 상태 확인 오류:", error);
            }
        };

        checkMarkStatus();
        checkHeartStatus();
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

    //스타일 마킹
    const handleMarkClick = async () => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        try {
            // 마킹된 상태 확인
            const markCheckResponse = await axios.get("http://localhost:8080/MarkCheck", {
                params: { st_num },
                withCredentials: true,
            });

            if (markCheckResponse.data) {
                alert("이미 마킹된 스타일입니다.");
                setIsMarked(true); // 마킹된 상태로 설정
            } else {
                // 마킹되지 않은 상태라면 마킹 진행
                const response = await axios.post(
                    `http://localhost:8080/StyleMark?st_num=${st_num}`,
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    alert("스타일 마킹이 완료되었습니다.");
                    setIsMarked(true); // 마킹된 상태로 설정
                }
            }
        } catch (error) {
            console.error("스타일 마킹 중 오류 발생:", error);
            alert("스타일 마킹 중 오류가 발생했습니다.");
        }
    };

    if (!style) {
        return <p>Loading...</p>;
    }

    const imageList = style.image ? style.image.split(",").map((img) => img.trim()) : [];
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
                    window.location.reload();
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
                    window.location.reload();
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
            <h2>STYLE</h2>
            <hr className="style-detail-hr"/>
            <div className="style-detail-content">
                <div className="style-detail-header">
                    <p>{style.user_id}</p>
                </div>
                <div>
                    {isMarked ? (
                        <FaBookmark className="mark-icon" onClick={handleMarkClick} />
                    ) : (
                        <CiBookmark className="mark-icon" onClick={handleMarkClick} />
                    )}
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
                        onClick={handleHeartClick}
                        style={{cursor: "pointer"}}
                    >
                        {isLiked ? "♥" : "♡"} {style.ht_count}
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
