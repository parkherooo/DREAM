import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./StyleUpdate.css";

function StyleUpdate() {
    const navigate = useNavigate();
    const { id, st_num } = useParams(); // 게시글 ID를 URL 파라미터에서 가져오기
    const [styleData, setStyleData] = useState({
        content: "",
        img: [], // 새로운 이미지 배열
        existingImg: [], // 기존 이미지
        hashtag: "",
        tags: [], // 상품 태그 리스트
    });

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        // 게시글 데이터 불러오기
        axios
            .get(`http://localhost:8080/StyleUpdate/${st_num}`)
            .then((response) => {
                const data = response.data;
                setStyleData({
                    ...styleData,
                    content: data.st_content,
                    existingImg: data.img ? data.img.split(",") : [], // 기존 이미지 배열 처리
                    hashtag: data.hashtag,
                    tags: Array.isArray(data.tags) ? data.tags : [], // 태그 배열 처리
                });
            })
            .catch((error) => {
                console.error(error);
                alert("게시글 데이터를 불러오는 중 오류가 발생했습니다.");
            });
    }, [st_num]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStyleData({ ...styleData, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setStyleData((prev) => ({
            ...prev,
            img: [...prev.img, ...files], // 새로운 이미지 추가
        }));

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setStyleData((prev) => {
            const updatedImg = [...prev.img];
            updatedImg.splice(index, 1);
            return { ...prev, img: updatedImg };
        });
        setPreviewImages((prev) => {
            const updatedPreviews = [...prev];
            updatedPreviews.splice(index, 1);
            return updatedPreviews;
        });
    };


    const handleSearch = () => {
        axios
            .post(`http://localhost:8080/searchProduct?keyword=${searchKeyword}`)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.error(error);
                alert("상품 검색 중 에러가 발생했습니다.");
            });
    };

    const addTag = (product) => {
        setStyleData((prev) => ({
            ...prev,
            tags: Array.isArray(prev.tags) ? [...prev.tags, product] : [product],
        }));
    };

    const removeTag = (index) => {
        setStyleData((prev) => {
            if (Array.isArray(prev.tags)) {
                const updatedTags = [...prev.tags];
                updatedTags.splice(index, 1);
                return { ...prev, tags: updatedTags };
            }
            return prev;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("st_num", st_num);
        formData.append("content", styleData.content);
        styleData.img.forEach((file) => formData.append("img", file));
        formData.append("hashtag", styleData.hashtag);
        formData.append("tags", JSON.stringify(styleData.tags));
        formData.append("existingImg", JSON.stringify(styleData.existingImg)); // 기존 이미지 정보 전송

        axios
            .post("http://localhost:8080/StyleUpdate", formData)
            .then((response) => {
                console.log(response.data);
                alert("수정되었습니다.");
                navigate("/StyleList");
            })
            .catch((error) => {
                console.error(error);
                alert("게시글 수정 중 에러가 발생했습니다.");
            });
    };

    return (
        <div className="style-update-container">
            <h2>게시글 수정</h2>
            <hr />
            <form onSubmit={handleSubmit} className="style-update-form">

                {/* 새 이미지 업로드 */}
                <div className="image-upload">
                    <label htmlFor="img">
                        <div className="upload-placeholder">이미지 추가</div>
                    </label>
                    <input
                        type="file"
                        id="img"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        style={{display: "none"}}
                    />
                </div>

                {/* 새 이미지 미리보기 */}
                <div className="image-preview-container">
                    {previewImages.map((src, index) => (
                        <div key={index} className="image-preview-wrapper">
                            <img src={src} alt={`preview-${index}`} className="image-preview"/>
                            <button
                                type="button"
                                className="remove-image-button"
                                onClick={() => removeImage(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <textarea
                    name="content"
                    placeholder="내용을 입력하세요"
                    value={styleData.content}
                    onChange={handleChange}
                ></textarea>

                <div className="hashtag-section">
                    <input
                        type="text"
                        name="hashtag"
                        placeholder="해시태그 입력"
                        value={styleData.hashtag}
                        onChange={handleChange}
                    />
                </div>

                <div className="product-search">
                    <input
                        type="text"
                        placeholder="브랜드명, 모델명, 모델번호 등"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button type="button" onClick={handleSearch}>
                        검색
                    </button>
                    <div className="search-results">
                        {searchResults.map((product, index) => (
                            <div key={index} className="search-result-item">
                                <img src={product.imgUrl} alt={product.name}/>
                                <div>{product.name}</div>
                                <div>{product.price}원</div>
                                <button type="button" onClick={() => addTag(product)}>
                                    추가
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tag-list">
                    {styleData.tags.map((tag, index) => (
                        <div key={index} className="tag-item">
                            <span>{tag.name}</span>
                            <button type="button" onClick={() => removeTag(index)}>
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <button type="submit" className="submit-button">
                    수정
                </button>
            </form>
        </div>
    );
}

export default StyleUpdate;

