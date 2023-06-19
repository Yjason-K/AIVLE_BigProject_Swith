import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/loginScreen.css";
import Myheader from "../components/header";

const FindID = () => {
  const navigate = useNavigate();
  const [idInfo, setIdInfo] = useState({
    username: '',
    serialnumber: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [verified, setVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setinfo = (e) => {
    const { name, value } = e.target;
    setIdInfo({ ...idInfo, [name]: value });
  };

  const verifyUser = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find((user) => user.username === idInfo.username && user.serialnumber === idInfo.serialnumber);

    if (foundUser) {
      setIdInfo(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
      setVerified(true);
    } else {
      alert("닉네임 또는 시리얼번호를 확인하세요.");
    }
  };

  const resetPassword = (e) => {
    e.preventDefault();

    if (idInfo.newPassword !== idInfo.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const foundUser = storedUsers.find((user) => user.username === idInfo.username && user.serialnumber === idInfo.serialnumber);

    if (foundUser) {
      foundUser.password = idInfo.newPassword;
      localStorage.setItem("users", JSON.stringify(storedUsers));
      alert("비밀번호가 성공적으로 재설정되었습니다!");
      setVerified(false);
      setIdInfo({ username: '', serialnumber: '', newPassword: '', confirmPassword: '' });
      navigate('/login');
    } else {
      alert("오류 발생. 다시 시도해 주세요.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="findpassword">
      <Myheader />
      <div className="findpwd">
        <center><h1 className="title">비밀번호 초기화</h1>
          {!verified ?
            <>
              <h5 className="subtitle">가입시 입력했던 닉네임과 시리얼번호를 입력하세요.</h5>
              <div className="verifyArea">
                <form onSubmit={verifyUser}>
                  <input type="text" className="nameInput" required
                    placeholder="닉네임" name="username" onChange={setinfo} key="username" />
                  <input type="text" className="serialnumberInput" required
                    placeholder="시리얼번호" name="serialnumber" onChange={setinfo} key="serialnumber" />
                  <button type="submit" className="sbButton">확인</button>
                </form>
              </div>
            </>
            :
            <>
              <h3 className="subtitle">새로운 비밀번호를 입력하세요. (6자 이상)</h3>
              <div className="resetPasswordArea">
                <form onSubmit={resetPassword}>
                  <input type={showPassword ? "text" : "password"} className="newPasswordInput" required
                    placeholder="새 비밀번호" name="newPassword" onChange={setinfo} key="newPassword" minLength="6" />
                  <input type={showPassword ? "text" : "password"} className="confirmPasswordInput" required
                    placeholder="비밀번호 확인" name="confirmPassword" onChange={setinfo} key="confirmPassword" minLength="6" /><br /><br />
                  <label>
                    <input type="checkbox" onChange={togglePasswordVisibility} />비밀번호 표시
                  </label>
                  <button type="submit" className="pwdchange">비밀번호 변경</button>
                </form>
              </div>
            </>
          }
        </center>
      </div>
    </div>
  );
};

export default FindID;
