import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./StyleList.css";

const StyleList = () => {
    const [styles, setStyles] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // 스타일을 가져오는 함수
    const fetchStyles = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axios.get("http://localhost:8080/StyleList");
            const newStyles = response.data;

            // 기존 스타일과 새로운 스타일을 병합하면서 좋아요 상태를 추가
            const updatedStyles = await Promise.all(newStyles.map(async (style) => {
                const checkResponse = await axios.get("http://localhost:8080/StyleHeartCheck", {
                    params: { st_num: style.st_num },
                    withCredentials: true,
                });
                return {
                    ...style,
                    isLiked: checkResponse.data,  // true면 좋아요 누른 상태, false면 누르지 않은 상태
                };
            }));

            setStyles((prevStyles) => {
                const existingIds = new Set(prevStyles.map((style) => style.st_num));
                return [
                    ...prevStyles,
                    ...updatedStyles.filter((style) => !existingIds.has(style.st_num)),
                ];
            });

            if (newStyles.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching styles:", error);
        } finally {
            setLoading(false);
        }
    };

    // 하트 클릭 이벤트 처리
    const handleHeartClick = async (st_num) => {
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
                    setStyles((prevStyles) =>
                        prevStyles.map((style) =>
                            style.st_num === st_num ? { ...style, isLiked: false } : style
                        )
                    );
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
                    setStyles((prevStyles) =>
                        prevStyles.map((style) =>
                            style.st_num === st_num ? { ...style, isLiked: true } : style
                        )
                    );
                }
            }
            window.location.reload();
        } catch (error) {
            console.error("Error processing heart click:", error);
            alert("좋아요를 처리할 수 없습니다.");
        }
    };


    // 스크롤 시 데이터 추가 로딩
    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            if (hasMore) {
                fetchStyles();
            }
        }
    }, [hasMore]);

    useEffect(() => {
        fetchStyles();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="style-list">
            <h2>STYLE</h2>
            <hr />
            <div>
                <Link to={`/StylePost`}>작성하기</Link>
            </div>
            <div className="style-cards">
                {styles.map((style) => (
                    <div key={style.st_num} className="style-card">
                        <div className="style-images">
                            {style.image && (
                                <Link to={`/StyleDetail/${style.st_num}`}>
                                    <img
                                        src={`http://localhost:8080/images/style/${style.image.split(",")[0]}`}
                                        alt={`Style Image 1`}
                                        className="style-image"
                                    />
                                </Link>
                            )}
                        </div>
                        <p>
                            {style.user_id}{" "}
                            <span
                                className="heart-icon"
                                onClick={() => handleHeartClick(style.st_num)}
                                style={{ cursor: "pointer" }}
                            >
                                {style.isLiked ? "♥" : "♡"} {style.ht_count}
                            </span>
                        </p>
                        <p>
                            <Link to={`/StyleDetail/${style.st_num}`}>{style.st_content}</Link>
                        </p>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more styles to load.</p>}
        </div>
    );
};

export default StyleList;
