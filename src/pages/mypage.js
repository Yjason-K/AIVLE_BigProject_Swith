import { useEffect, useState } from "react";
import Myheader from "../components/header";
import "../style/loginScreen.css";
import { Link, useNavigate } from "react-router-dom";

const MYPAGE = () => {
  const session = JSON.parse(localStorage.getItem("userId")).id;
  const [sessionId, setSessionId] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [verified, setVerified] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /\S+@\S+\.\S+/;

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = storedUsers.find((user) => user.username === session);
      if (foundUser) {
        setCurrentUser(foundUser);
        setPhoneNumber(foundUser.phone);
        setEmail(foundUser.email);
        setName(foundUser.name);
        setSerialNumber(foundUser.serialnumber);
      }
    }
  }, [session]);

  const verifyPassword = (e) => {
    e.preventDefault();
    if (currentUser && currentUser.password === password) {
      setVerified(true);
    } else {
      alert('비밀번호가 잘못되었습니다.');
    }
  };

  const updateUserInfo = (e) => {
    e.preventDefault();

    if (newPassword !== newPasswordConfirmation) {
      alert('입력한 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUserIndex = storedUsers.findIndex((user) => user.username === session);

    if (currentUserIndex > -1) {
      storedUsers[currentUserIndex] = {
        ...storedUsers[currentUserIndex],
        password: newPassword,
        phone: phoneNumber,
        email: email,
        name: name,
        serialnumber: serialNumber
      };
      localStorage.setItem('users', JSON.stringify(storedUsers));
      alert('회원 정보가 성공적으로 수정되었습니다.');
      navigate('/service');
    } else {
      alert('회원 정보를 찾을 수 없습니다.');
    }
  };

  const renderContent = () => {
    if (sessionId) {
      if (verified) {
        return (
          <center>
          <div className="mypageFrame">
            <Link to="/service">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left Arrows" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>
            </Link>
            <div className="editArea">
              <form onSubmit={updateUserInfo}>
                <div>
                  <input type="text" className="nameInput" value={name} onChange={(e) => setName(e.target.value)} />

                  <input type="text" className="idInput" value={session} disabled />

                  <input type={showPassword ? "text" : "password"} className="pwInput" placeholder="비밀번호 변경" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength="6" />

                  <input type={showPassword ? "text" : "password"} className="pwInput" placeholder="비밀번호 확인" value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} required minLength="6" />

                  <input type="text" className="serialnumberInput" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />

                  <input type="text" className="phoneInput" placeholder="전화번호 변경" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required pattern="\d{11}" maxLength="11" />

                  <input type="email" className="emailInput" placeholder="이메일 변경" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <label className="showPw">
                  <br />
                  <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> 비밀번호 표시
                </label>
                <button type="submit" className="pwdchange">회원정보수정</button>
              </form>
            </div>
          </div>
          </center>
        );
      }
      return (
        <center>
          <div className="mypage_pwcheck">
            <h1>회원정보수정</h1>
            <form onSubmit={verifyPassword}>
              <input type="password" className="pwInput" placeholder="비밀번호 확인" onChange={(e) => setPassword(e.target.value)} />
              <input type="submit" className="sbButton" value="확인" />
            </form>
          </div>
        </center>
      );
    }
  };

  return (
    <div className="mypage">
      <Myheader isLogin={sessionId} />
      {renderContent()}
    </div>
  );
};

export default MYPAGE;