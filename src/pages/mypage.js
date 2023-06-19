// mypage 로그인 했을 경우에만 접근가능 비밀번호 변경 개인정보 수정을 위한 페이지
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Myheader from "../components/header";
import "../style/loginScreen.css"; // Import CSS from login component

const MYPAGE = () => {
  const session = JSON.parse(localStorage.getItem("userId")).id;
  const [sessionId, setSessionId] = useState(false);
  const [password, setPassword] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, [session]);

  const verifyPassword = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = storedUsers.find((user) => user.username === session);

    if (currentUser && currentUser.password === password) {
      setVerified(true);
    } else {
      alert('비밀번호가 잘못되었습니다.');
    }
  };

  const renderContent = () => {
    if (sessionId) {
      if (verified) {
        return <center>
          <br /><br /><br />
          <img src="https://blog.kakaocdn.net/dn/bHzCFD/btri1duRXGM/C98W6o4czhKgDOx274FOaK/img.png" alt = "사진" width="1000px" />
        </center>
      }
      return (
        <center>
          <div className="mypage_pwcheck">
            <form onSubmit={verifyPassword}>
              <input type="password" className="pwInput" placeholder="비밀번호 확인" onChange={(e) => setPassword(e.target.value)} />
              <input type="submit" className="sbButton" value="확인" />
            </form>
          </div>
        </center>
      )
    }
  }

  return (
    <div className="mypage">
      <Myheader isLogin={sessionId} />
      {renderContent()}
    </div>
  );
};

export default MYPAGE;
