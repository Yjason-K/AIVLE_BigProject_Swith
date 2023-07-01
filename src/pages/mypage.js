import { useEffect, useState, useRef } from "react";
import Myheader from "../components/header";
import "../style/mypage.css";
import { Link, useNavigate } from "react-router-dom";

const MYPAGE = () => {
  const session = JSON.parse(localStorage.getItem("token"));
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = storedUsers.find((user) => user.username === session) || {};

  const [sessionId, setSessionId] = useState(session && session !== "null");
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(foundUser.phone || '');
  const [name, setName] = useState(foundUser.name || '');
  const [serialNumber, setSerialNumber] = useState(foundUser.serialnumber || '');
  const [ageNumber, setAgeNumber] = useState(foundUser.agenumber || '');
  const [timeNumber1, setTimeNumber1] = useState(foundUser.timenumber ? foundUser.timenumber[0] : '');
  const [timeNumber2, setTimeNumber2] = useState(foundUser.timenumber ? foundUser.timenumber[1] : '');
  const [verified, setVerified] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "aaaa",
    email: "aaaa@aa.aaa",
    password: "111111"
  });
  const [showPassword, setShowPassword] = useState(false);
  const timeRef1 = useRef();
  const timeRef2 = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("token"));
    if (session && session !== "null") {
      setSessionId(true);
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = storedUsers.find((user) => user.username === session);
      if (foundUser) {
        setCurrentUser(foundUser);
        setPhoneNumber(foundUser.phone);
        setName(foundUser.name);
        setSerialNumber(foundUser.serialnumber);
        setAgeNumber(foundUser.agenumber);
        setTimeNumber1(foundUser.timenumber[0]);
        setTimeNumber2(foundUser.timenumber[1]);
      }
    }
  }, []);


  const verifyPassword = (e) => {
    e.preventDefault();
    if (currentUser && currentUser.password === password) {
      setVerified(true);
    } else {
      alert("비밀번호가 잘못되었습니다.");
    }
  };

  const confirmPwRef = useRef();
  const ageRef = useRef();
  const timeRef = useRef();

  const updateUserInfo = (e) => {
    e.preventDefault();
    console.log({
      newPassword,
      newPasswordConfirmation,
      name,
      serialNumber,
      phoneNumber,
      ageNumber,
      timeNumber1,
      timeNumber2,
    });

    if (newPassword && newPassword !== newPasswordConfirmation) {
      alert('입력한 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      confirmPwRef.current.focus();
      return;
    }

    const age = Number(ageNumber);
    if (isNaN(age) || age < 0 || age > 120) {
      alert('연령은 0~120 사이의 값이어야 합니다.');
      ageRef.current.focus();
      return;
    }

    const timeRange = [timeNumber1, timeNumber2];
    if (timeRange.some(time => isNaN(time) || time < 0 || time > 24)) {
      alert('이용 시간대는 0~24 사이의 두 개의 숫자로 지정해야 합니다. 예: 9~18');
      timeRef.current.focus();
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserIndex = storedUsers.findIndex(
      (user) => user.username === session
    );

    if (currentUserIndex > -1) {
      const updatedUser = {
        ...currentUser,
        password: newPassword || currentUser.password,
        phone: phoneNumber || currentUser.phone,
        name: name || currentUser.name,
        serialnumber: serialNumber || currentUser.serialnumber,
        agenumber: ageNumber || currentUser.agenumber,
        timenumber: [timeNumber1, timeNumber2] || currentUser.timenumber
      };

      if (
        currentUser.password === updatedUser.password &&
        currentUser.phone === updatedUser.phone &&
        currentUser.name === updatedUser.name &&
        currentUser.serialnumber === updatedUser.serialnumber &&
        currentUser.agenumber === updatedUser.agenumber &&
        currentUser.timenumber[0] === updatedUser.timenumber[0] &&
        currentUser.timenumber[1] === updatedUser.timenumber[1]
      ) {
        alert("수정된 부분이 없습니다.");
        navigate("/service");
        return;
      }

      storedUsers[currentUserIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(storedUsers));
      setCurrentUser(updatedUser);

      alert("회원 정보가 성공적으로 수정되었습니다.");
      navigate("/service");
    } else {
      alert("회원 정보를 찾을 수 없습니다.");
    }
  };

  const renderContent = () => {
    if (sessionId) {
      if (verified) {
        return (
          <div className="mypage_main">
            <center>
              <div className="mypageFrame">
                <Link to="/service">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    style={{
                      position: 'absolute',
                      left: '37px',
                      top: '30px',
                      cursor: 'pointer',
                      backgroundColor: 'rgb(242, 242, 242)',
                      padding: '4px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      fill: 'black',
                      transition: 'all ease-in-out 0.15s'
                    }}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </Link>
                <div className="editArea">
                  <form onSubmit={updateUserInfo}>
                    <div>
                      <input type="text" className="idInput" value={`닉네임: ${currentUser.username}`} disabled />
                      <input type="email" className="emailInput" placeholder={`이메일: ${currentUser.email}`} disabled />
                      <input type="password" className="pwInput" placeholder="비밀번호 변경(6글자 이상)" onChange={(e) => setNewPassword(e.target.value)} minLength="6" />
                      <input ref={confirmPwRef} type="password" className="pwInput" placeholder="비밀번호 확인(6글자 이상)" onChange={(e) => setNewPasswordConfirmation(e.target.value)} minLength="6" />
                      <hr className="hr" style={{ marginBottom: "10px", marginTop: "25px" }} />
                      <input type="text" className="nameInput" placeholder={`이름: ${currentUser.name}`} onChange={(e) => setName(e.target.value)} />
                      <input type="text" className="serialnumberInput" placeholder={`시리얼넘버: ${currentUser.serialnumber}`} onChange={(e) => setSerialNumber(e.target.value)} />
                      <input type="text" className="phoneInput" placeholder={`전화번호: ${currentUser.phone}`} onChange={(e) => setPhoneNumber(e.target.value)} pattern="\d{11}" maxLength="11" />
                      <hr className="hr" style={{ marginBottom: "10px", marginTop: "25px" }} />
                      <input ref={ageRef} type="text" className="ageInput" placeholder={`연령: ${currentUser.agenumber}`} onChange={(e) => setAgeNumber(e.target.value)} />
                      <div>
                        <input ref={timeRef1} type="time" className="timeInput" onChange={(e) => { setTimeNumber1(parseInt(e.target.value.split(":")[0])); }} />
                        &nbsp; ~ &nbsp;
                        <input ref={timeRef2} type="time" className="timeInput" onChange={(e) => { setTimeNumber2(parseInt(e.target.value.split(":")[0])); }} />
                      </div>
                      <hr className="hr" style={{ marginBottom: "10px", marginTop: "25px" }} />
                    </div>
                    <label className="showPw">
                      <input
                        type="checkbox"
                        className=""
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />{" "}
                      비밀번호 표시
                    </label>
                    <div style={{ marginTop: "-10px" }}>
                      <br />
                      수정 할 부분을 입력하세요.
                    </div>
                    <button type="submit" className="mypage_button">
                      회원정보수정
                    </button>
                  </form>
                </div>
              </div>
            </center>
          </div>
        );
      }
      return (
        <div className="mypage_pwcheck">
          <h1>회원정보수정</h1>
          <form onSubmit={verifyPassword}>
            <input type="password" style={{ textAlign: "center" }} className="mypagepwInput" placeholder="비밀번호 확인" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" className="mypage_button" value="확인" />
          </form>
        </div>
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
