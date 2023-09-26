import HEADER from "./components/header/header";
import HOME from "./pages/home";
import NEWPOST from "./pages/newpost";
import POSTEDIT from "./pages/postedit";
import POST from "./pages/post";
import POSTLIST from "./pages/postlist";
import FAQ from "./pages/faq";
import AIVLE from "./pages/aivle";
import MYPAGE from "./pages/mypage";
import LOGIN from "./pages/login";
import SIGNUP from "./pages/signup";
import SERVICE from "./pages/service";
import Find from "./pages/find";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HEADER />
        <Routes>
          {/* 헤더 */}
          {/* 홈헤이지 */}
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<HOME />} />
          {/* 게시판 페이지 */}
          <Route path="/newpost" element={<NEWPOST />} />
          <Route path="/edit/:id" element={<POSTEDIT />} />
          <Route path="/post/:id" element={<POST />} />
          <Route path="/postlist" element={<POSTLIST />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/team21" element={<AIVLE />} />
          {/* 로그인 회원가입 사용자 정보 */}
          <Route path="/mypage" element={<MYPAGE />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/signup" element={<SIGNUP />} />
          <Route path="/findid" element={<Find />} />
          {/* 서비스 페이지 */}
          <Route path="/service" element={<SERVICE />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
