import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./StyleList.css";
const StyleList = () => {
    const [styles, setStyles] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchStyles = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axios.get("http://localhost:8080/StyleList");
            const newStyles = response.data;

            setStyles((prevStyles) => {
                const existingIds = new Set(prevStyles.map((style) => style.id));
                return [
                    ...prevStyles,
                    ...newStyles.filter((style) => !existingIds.has(style.id)),
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
            <hr/>
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
                            {style.user_id} ♡{style.ht_count}
                        </p>
                        <p>
                            <Link to={`/StyleDetail/${style.st_num}`}>{style.title}</Link>
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
