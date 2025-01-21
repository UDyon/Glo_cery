import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frist from "./pages/Frist/Frist";
import Loading from './pages/Loading/Loading';
import Second from './pages/ Second/Second'; // Second 페이지 추가
import './App.css';
import Main from "./pages/Main/main";
import Page2 from "./pages/Page2/page2";
import MenuRecommend from "./pages/MenuRecommend/menuRecommend";
import Recommend from "./pages/Recommend/recommend";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
                <Route path="/first" element={<Frist />} /> {/* 기본 경로 */}
                <Route path="/loading" element={<Loading />} /> {/* 로딩 화면 */}
                <Route path="/second" element={<Second />} /> {/* Second 화면 */}
                <Route path="/page2" element={<Page2 />} /> {/* 두 번째 화면 */}
                <Route path="/menuRecommend" element={<MenuRecommend />} /> {/* 메인 페이지 */}
                <Route path="/recommend" element={<Recommend />} /> {/* 메인 페이지 */}
            </Routes>
        </BrowserRouter>

    );
}

export default App;
