// SearchPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // URL 이동을 위해 useNavigate 사용
import { CiSearch } from "react-icons/ci";
import "./Search.css";
const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            // URL에 쿼리 문자열을 추가하여 이동
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="검색어를 입력하세요."
                />
                <button type="submit" className="search"><CiSearch /></button>
            </form>
        </div>
    );
};

export default SearchPage;
