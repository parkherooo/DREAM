import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StylePost.css";

function StylePost() {
    const navigate = useNavigate();

    const [styleData, setStyleData] = useState({
        content: "",
        img: [], // 이미지 배열로 변경
        hashtag: "",
        tags: [], // 상품 태그 리스트
    });

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [previewImages, setPreviewImages] = useState([]); // 미리보기 이미지
    const [productDetails, setProductDetails] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStyleData({ ...styleData, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // 여러 파일 선택 가능
        setStyleData((prev) => ({
            ...prev,
            img: [...prev.img, ...files], // 기존 이미지에 추가
        }));

        // 미리보기 이미지 업데이트
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...newPreviews]);
    };

    // 이미지 제거 기능
    const removeImage = (index) => {
        setStyleData((prev) => {
            const updatedImg = [...prev.img];
            updatedImg.splice(index, 1); // 파일 배열에서 제거
            return { ...prev, img: updatedImg };
        });
        setPreviewImages((prev) => {
            const updatedPreviews = [...prev];
            updatedPreviews.splice(index, 1); // 미리보기 이미지 배열에서 제거
            return updatedPreviews;
        });
    };

    const handleSearch = () => {
        // 상품 검색 API 호출
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

    const addTag = (p_num, p_details) => {
        setStyleData((prev) => ({
            ...prev,
            tags: [...prev.tags, p_num],
        }));
        setProductDetails((prev) => [...prev, { p_num, p_details }]);
    };

    const removeTag = (index) => {
        setStyleData((prev) => {
            const updatedTags = [...prev.tags];
            updatedTags.splice(index, 1);
            return { ...prev, tags: updatedTags };
        });

        // productDetails에서 해당 p_num 제거
        setProductDetails((prev) => {
            const updatedDetails = [...prev];
            updatedDetails.splice(index, 1);
            return updatedDetails;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 내용(content)과 이미지(img)가 비어 있는지 체크
        if (!styleData.content.trim() || styleData.img.length === 0) {
            alert("내용과 이미지를 모두 입력해주세요.");
            return; // 유효하지 않으면 함수 종료
        }

        const formData = new FormData();
        formData.append("content", styleData.content);
        styleData.img.forEach((file) => formData.append("img", file)); // 다중 이미지 추가
        formData.append("hashtag", styleData.hashtag);
        formData.append("tags", JSON.stringify(styleData.tags));

        axios
            .post("http://localhost:8080/StylePost", formData)
            .then((response) => {
                console.log(response.data);
                alert("작성되었습니다.");
                navigate("/StyleList");
            })
            .catch((error) => {
                console.error(error);
                alert("게시글 작성 중 에러가 발생했습니다.");
            });
    };

    return (
        <div className="style-post-container">
            <h2>STYLE</h2>
            <hr/>
            <form onSubmit={handleSubmit} className="style-post-form">
                <div className="image-upload">
                    <label htmlFor="img">
                        <div className="upload-placeholder">이미지 등록</div>
                    </label>
                    <input
                        type="file"
                        id="img"
                        accept="image/*"
                        multiple // 다중 이미지 선택 허용
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                </div>

                {/* 이미지 미리보기 */}
                <div className="image-preview-container">
                    {previewImages.map((src, index) => (
                        <div key={index} className="image-preview-wrapper">
                            <img
                                src={src}
                                alt={`preview-${index}`}
                                className="image-preview"
                            />
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
                        placeholder="해시태그 입력 (예: #스타일)"
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
                                <img
                                    src={`http://localhost:8080/product_img/${product.p_img.split(',')[0].trim()}`}
                                    alt={product.p_img.split(',')[0].trim()}
                                    className="search-result-img"
                                />
                                <div>{product.p_details}</div>
                                <div>{product.size}</div>
                                <button type="button" onClick={() => addTag(product.p_num, product.p_details)}>
                                    추가
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tag-list">
                    {productDetails.map((product, index) => (
                        <div key={index} className="tag-item">
                            <span>{product.p_details}</span> {/* p_details를 출력 */}
                            <button type="button" onClick={() => removeTag(index)}>
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <button type="submit" className="submit-button">
                    등록하기
                </button>
            </form>
        </div>
    );
}

export default StylePost;
