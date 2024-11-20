import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './user/SignUp'; // 'user' 폴더 안의 'SignUp.js' 파일 경로

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/SignUp" element={<SignUp />} />
                {/* 다른 경로들도 여기에 추가할 수 있습니다 */}
            </Routes>
        </Router>
    );
}

export default App;
