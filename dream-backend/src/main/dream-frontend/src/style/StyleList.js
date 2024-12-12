import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./StyleList.css";
import { PiCameraPlus } from "react-icons/pi";

const StyleList = () => {
    const [styles, setStyles] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);  // 로그인 상태를 관리할 상태 추가
    const location = useLocation();  // URL의 쿼리 파라미터를 받기 위한 useLocation 훅 사용

    // 로그인 상태를 확인하는 함수
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get("http://localhost:8080/check-session", { withCredentials: true });
            console.log("Session Check Response:", response.data); // 응답 확인
            setIsLoggedIn(response.data.isLoggedIn); // isLoggedIn 값을 상태로 설정
        } catch (error) {
            console.error("Error checking login status:", error);
            setIsLoggedIn(false); // 에러 발생 시 로그인 상태를 false로 설정
        }
    };

    // 스타일을 가져오는 함수
    const fetchStyles = async (hashtag) => {
        if (loading) return;
        setLoading(true);

        try {
            const url = hashtag
                ? `http://localhost:8080/StyleList?hashtag=${hashtag}`
                : "http://localhost:8080/StyleList";
            const response = await axios.get(url);
            const newStyles = response.data;

            // 기존 스타일과 새로운 스타일을 병합
            setStyles((prevStyles) => {
                const existingIds = new Set(prevStyles.map((style) => style.st_num));
                return [
                    ...prevStyles,
                    ...newStyles.filter((style) => !existingIds.has(style.st_num)),
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
        if (!isLoggedIn) {
            alert("로그인 후 좋아요를 누를 수 있습니다.");
            return;
        }

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
                fetchStyles(new URLSearchParams(location.search).get("hashtag"));
            }
        }
    }, [hasMore, location.search]);

    useEffect(() => {
        fetchStyles(new URLSearchParams(location.search).get("hashtag"));
        checkLoginStatus();  // 로그인 상태를 확인
    }, [location.search]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="style-list">
            <h2>STYLE</h2>
            <hr className="style-list-hr"/>
            <div className="style-post-button-container">
                <div className="tag-item">
                    BEST HASHTAG :
                    <a href="/StyleList?hashtag=인기게시물">#인기게시물</a>
                    <a href="/StyleList?hashtag=겨울코디">#겨울코디</a>
                    <a href="/StyleList?hashtag=나이키">#나이키</a>
                    <a href="/StyleList?hashtag=아디다스">#아디다스</a>
                </div>
                <div className="style-post-button">
                    <Link
                        to={isLoggedIn ? `/StylePost` : "#"}
                        onClick={(e) => {
                            if (!isLoggedIn) {
                                e.preventDefault(); // 링크 동작을 막음
                                alert("로그인 후 이용해주세요.");
                            }
                        }}
                    >
                        <PiCameraPlus className="icons"/>
                    </Link>
                </div>
            </div>
            <hr className="style-post-button-hr"/>
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
                                style={{cursor: "pointer"}}
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
        </div>
    );
};

export default StyleList;
