import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./home/Header"; // 고정 헤더
import Login from "./user/Login"; // 로그인 페이지
import BannerSlider from "./home/BannerSlider"; // 배너 슬라이더
import CategoryList from "./home/CategoryList"; // 카테고리 목록
import ShopBanner from "./shop/ShopBanner"; // 샵 배너 추가
import ShopPage from "./shop/ShopPage"; // 샵 카테고리별 내용
import "./App.css";
import SignUp from "./user/SignUp";

function App() {
    return (
        <Router>
            <div className="App">
                <Header /> {/* 모든 페이지에서 고정 표시 */}
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    {/* 메인 페이지 내용 */}
                                    <BannerSlider />
                                    <CategoryList />
                                </>
                            }
                        />
                        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
                        <Route path="/SignUp" element={<SignUp />} /> {/* 로그인 페이지 */}
                        <Route path="/my-page" element={<div>My Page</div>} /> {/* 마이페이지 */}
                        <Route path="/interests" element={<div>관심 페이지</div>} /> {/* 관심 페이지 */}
                        <Route path="/notifications" element={<div>알림 페이지</div>} /> {/* 알림 페이지 */}

                        {/* SHOP 페이지 */}
                        <Route
                            path="/shop/*"
                            element={
                                <>
                                    <ShopBanner /> {/* SHOP 배너 */}
                                    <ShopPage /> {/* SHOP 카테고리별 내용 */}
                                </>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
