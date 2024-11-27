import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const StyleList = () => {
    const [styles, setStyles] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // 데이터 가져오기
    const fetchStyles = async () => {
        if (loading) return; // 중복 호출 방지
        setLoading(true);

        try {
            const response = await axios.get(
                "http://localhost:8080/StyleList" // 백엔드에서 모든 스타일을 가져오는 API
            );
            const newStyles = response.data;

            if (newStyles.length === 0) {
                setHasMore(false); // 더 이상 데이터가 없으면 로딩 중단
            } else {
                setStyles((prevStyles) => [...prevStyles, ...newStyles]);
            }
        } catch (error) {
            console.error("Error fetching styles:", error);
        } finally {
            setLoading(false);
        }
    };

    // 스크롤 이벤트 핸들러
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

    // 컴포넌트가 마운트될 때 최초 데이터 가져오기
    useEffect(() => {
        fetchStyles();
    }, []);

    // 스크롤 이벤트 등록 및 해제
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="style-list">
            <h1>Style List</h1>
            <div className="style-cards">
                {styles.map((style, index) => (
                    <div key={index} className="style-card">
                        <h2>{style.userId}</h2>
                        <h2>{style.title}</h2>
                        <p>{style.stContent}</p>
                        <p>Hashtags: {style.hashtag}</p>
                        <div className="style-images">
                            {style.images && style.images.split(',')[0] && (
                                <img
                                    src={`C:\\DREAM\\dream-backend\\src\\main\\java\\com\\dita\\dreambackend\\style\\images/${style.images.split(',')[0]}`}
                                    alt={`Style Image 1`}
                                    className="style-image"
                                />
                            )}
                        </div>
                        <p>Posted on: {new Date(style.stDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more styles to load.</p>}
        </div>
    );
};

export default StyleList;
