import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frist from "./pages/Frist/Frist";
import Loading from './pages/Loading/Loading';
import Second from './pages/ Second/Second'; // Second 페이지 추가
import './App.css';

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Frist />} /> {/* 기본 경로 */}
                    <Route path="/loading" element={<Loading />} /> {/* 로딩 화면 */}
                    <Route path="/second" element={<Second />} /> {/* Second 화면 */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
