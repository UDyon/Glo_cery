import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '../src/pages/Test/test'
import Chanho from '../src/pages/chanhomade/chanhomade'
import Signup from '../src/pages/SignUp/signup'
import Login from '../src/pages/Login/login'
import FindHospital from "./pages/FindHospital/findHospital";
import Community from "./pages/Community/community";
import Main from "./pages/Main/main";
import New from "./pages/Community/new";
import PostDetail from "./pages/Community/postDetail";
import PainRecord from "./pages/PainRecord/painrecord";
import PainReport from "./pages/PainReport/PainReport";
import PainList from "./pages/PainList/painlist";
import Edit from "./pages/Community/edit";
import PrivacyAgreement from "./pages/SignUp/privacyAgreement";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/chanho" element={<Chanho />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacyAgreement" element={<PrivacyAgreement />} />
                <Route path="/login" element={<Login />} />
                <Route path="/findHospital" element={<FindHospital />} />
                <Route path="/community" element={<Community />} />
                <Route path="/test" element={<Test />} />
                <Route path="/new" element={<New />} />
                <Route path="/postDetail/:id" element={<PostDetail />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/painRecord" element={<PainRecord />} />
                <Route path="/painReport" element={<PainReport />} />
                <Route path="/list" element={<PainList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;