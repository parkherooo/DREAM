import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./home/Header";
import Login from "./user/Login";
import BannerSlider from "./home/BannerSlider";
import CategoryList from "./home/CategoryList";
import ShopBanner from "./shop/ShopBanner";
import ShopCategory from "./shop/ShopCategory";
import SignUp from "./user/SignUp";
import StylePost from "./style/StylePost";
import StyleList from "./style/StyleList";
import StyleDetail from "./style/StyleDetail";
import StyleUpdate from "./style/StyleUpdate";
import "./App.css";

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
                        <Route path="/my-page" element={<div>My Page</div>} />
                        <Route path="/interests" element={<div>관심 페이지</div>} />
                        <Route path="/notifications" element={<div>알림 페이지</div>} />
                        <Route path="/shop/*" element={<><ShopBanner /><ShopCategory /></>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
