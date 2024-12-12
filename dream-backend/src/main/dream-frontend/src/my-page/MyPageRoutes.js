import React from "react";
import { Routes, Route } from "react-router-dom";
import Mypage from "./Mypage";
import SalesHistory from "./SalesHistory";
import BuysHistory from "./BuysHistory";
import Interests from "./Interests";
import Information from "./Information";
import Delete from "./Delete";
import Address from "./Address";
import Profile from "./Profile";

function MyPageRoutes() {
    return (
        <Routes>
            <Route path="/my-page" element={<Mypage />} />
            <Route path="/my-page/sales-history" element={<SalesHistory />} />
            <Route path="/my-page/buys-history" element={<BuysHistory />} />
            <Route path="/my-page/interests" element={<Interests />} />
            <Route path="/my-page/information" element={<Information />} />
            <Route path="/my-page/delete" element={<Delete />} />
            <Route path="/my-page/address" element={<Address />} />
            <Route path="/my-page/profile" element={<Profile />} />
        </Routes>
    );
}

export default MyPageRoutes;
