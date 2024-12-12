import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./home/Header"; // 고정 헤더
import Login from "./user/Login"; // 로그인 페이지
import BannerSlider from "./home/BannerSlider"; // 배너 슬라이더
import CategoryList from "./home/CategoryList"; // 카테고리 목록
import ShopBanner from "./shop/ShopBanner"; // 샵 배너 추가
import ShopPage from "./shop/ShopPage"; // 샵 카테고리별 내용
import Cart from "./cart/Cart"; // 장바구니 요약 섹션
import SignUp from "./user/SignUp";
import StylePost from "./style/StylePost";
import StyleList from "./style/StyleList";
import StyleDetail from "./style/StyleDetail";
import StyleUpdate from "./style/StyleUpdate";
import "./App.css";
import MyPageRoutes from "./my-page/MyPageRoutes";
import Interests from "./my-page/Interests";
import AlarmOverlay from "./home/alarm/AlarmOverlay";
import axios from "axios";
import FindEmail from "./user/Find-email";
import FindPassword from "./user/Find-password";

axios.defaults.withCredentials = true;

function NaverCallback() {
    // 네이버 로그인 콜백 처리 페이지
    return <div>네이버 로그인 처리 중입니다...</div>;
}

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
                                    <BannerSlider />
                                    <CategoryList />
                                </>
                            }
                        />
                        <Route path="/StylePost" element={<StylePost />} />
                        <Route path="/StyleList" element={<StyleList />} />
                        <Route path="/StyleDetail/:st_num" element={<StyleDetail />} />
                        <Route path="/StyleUpdate/:st_num" element={<StyleUpdate />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/SignUp" element={<SignUp />} />

                        <Route path="/*" element={<MyPageRoutes />} />
                        <Route path="/interests" element={<Interests />} />
                        <Route path="/alarm" element={<AlarmOverlay />} />
                        <Route path="/Find-email" element={<FindEmail />} />
                        <Route path="/Find-password" element={<FindPassword />} />
                          
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

                        {/* 장바구니 페이지 */}
                        <Route path="/cart" element={<Cart />} />

                        {/* 네이버 로그인 콜백 처리 경로 */}
                        <Route path="/naver-callback" element={<NaverCallback />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
