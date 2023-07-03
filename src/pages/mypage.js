import { useEffect, useState, useRef } from "react";
import Myheader from "../components/header";
import "../style/mypage.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const MYPAGE = () => {
  const [sessionId, setSessionId] = useState(false);
  const [password, setPassword] = useState(""); // 기존 pwd
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [ageNumber, setAgeNumber] = useState("");
  const [timeNumber1, setTimeNumber1] = useState("");
  const [timeNumber2, setTimeNumber2] = useState("");
  const [verified, setVerified] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const timeRef1 = useRef();
  const timeRef2 = useRef();
  const navigate = useNavigate();

  // 변경 예정
  const [nickname, setNickname] = useState("");

  // 기본정보 불러오기
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `http://15.165.98.14:8080/users/user`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).accessToken
        }`,
      },
    }).then((res) => {
      setUserEmail(res.data.email);
      setNickname(res.data.nickname);
      setSerialNumber(res.data.serialNumber);
      setName(res.data.name);
      setPhoneNumber(res.data.phoneNumber);
      setSessionId(true);
    });
  }, []);

  const verifyPassword = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://15.165.98.14:8080/users/check",
      data: {
        email: userEmail,
        password: password,
      },
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).accessToken
        }`,
      },
    })
      .then((res) => {
        setVerified(true);
        setCurrentUser(true);
      })
      .catch((err) => {
        window.alert("비밀번호가 일치하지 않습니다!");
      });
  };

  const confirmPwRef = useRef();
  const ageRef = useRef();
  const timeRef = useRef();

  const updateUserInfo = (e) => {
    e.preventDefault();

    axios({
      method: "put",
      url: `http://15.165.98.14:8080/users/edit/143`,
      data: {
        nickname: nickname,
        password: newPasswordConfirmation,
        serialNumber: serialNumber,
      },
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).accessToken
        }`,
      },
    }).then((res) => {
      console.log("회원정보 수정 완료!");
      navigate("/service", { replace: true });
    });

    // if (newPassword && newPassword !== newPasswordConfirmation) {
    //   alert("입력한 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    //   confirmPwRef.current.focus();
    //   return;
    // }

    // const age = Number(ageNumber);
    // if (isNaN(age) || age < 0 || age > 120) {
    //   alert("연령은 0~120 사이의 값이어야 합니다.");
    //   ageRef.current.focus();
    //   return;
    // }

    // const timeRange = [timeNumber1, timeNumber2];
    // if (timeRange.some((time) => isNaN(time) || time < 0 || time > 24)) {
    //   alert(
    //     "이용 시간대는 0~24 사이의 두 개의 숫자로 지정해야 합니다. 예: 9~18"
    //   );
    //   timeRef.current.focus();
    //   return;
    // }

    // const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    // const currentUserIndex = storedUsers.findIndex(
    //   (user) => user.username === session
    // );

    // if (currentUserIndex > -1) {
    //   const updatedUser = {
    //     ...currentUser,
    //     password: newPassword || currentUser.password,
    //     phone: phoneNumber || currentUser.phone,
    //     name: name || currentUser.name,
    //     serialnumber: serialNumber || currentUser.serialnumber,
    //     agenumber: ageNumber || currentUser.agenumber,
    //     timenumber: [timeNumber1, timeNumber2] || currentUser.timenumber,
    //   };

    //   if (
    //     currentUser.password === updatedUser.password &&
    //     currentUser.phone === updatedUser.phone &&
    //     currentUser.name === updatedUser.name &&
    //     currentUser.serialnumber === updatedUser.serialnumber &&
    //     currentUser.agenumber === updatedUser.agenumber &&
    //     currentUser.timenumber[0] === updatedUser.timenumber[0] &&
    //     currentUser.timenumber[1] === updatedUser.timenumber[1]
    //   ) {
    //     alert("수정된 부분이 없습니다.");
    //     navigate("/service");
    //     return;
    //   }

    //   storedUsers[currentUserIndex] = updatedUser;
    //   localStorage.setItem("users", JSON.stringify(storedUsers));
    //   setCurrentUser(updatedUser);

    //   alert("회원 정보가 성공적으로 수정되었습니다.");
    //   navigate("/service");
    // } else {
    //   alert("회원 정보를 찾을 수 없습니다.");
    // }
  };

  // const withdraw = () => {
  //   axios({
  //     method: "delete",
  //     url: `http://15.165.98.14:8080/users/withdraw/${serialNumber}`,
  //   }).then(() => {
  //     console.log("회원탈퇴 성공!");
  //     localStorage.removeItem("token");
  //     navigate("/main", { replace: true });
  //   });
  // };

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
                    className="bi bi-arrow-left Arrows"
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
                      <input
                        type="text"
                        className="idInput"
                        value={nickname}
                        placeholder="닉네임: 4글자 이상"
                        onChange={(e) => setNickname(e.target.value)}
                        minLength="4"
                      />
                      <input
                        type="email"
                        className="emailInput"
                        placeholder={`이메일: ${userEmail}`}
                        disabled
                      />
                      <input
                        type="password"
                        className="pwInput"
                        placeholder="비밀번호 변경(특수문자, 영어 소문자, 숫자 포함 8글자 이상)"
                        onChange={(e) => setNewPassword(e.target.value)}
                        minLength="6"
                      />
                      <input
                        ref={confirmPwRef}
                        type="password"
                        className="pwInput"
                        placeholder="비밀번호 변경(특수문자, 영어 소문자, 숫자 포함 8글자 이상)"
                        onChange={(e) =>
                          setNewPasswordConfirmation(e.target.value)
                        }
                        minLength="6"
                      />
                      <hr
                        className="hr"
                        style={{ marginBottom: "10px", marginTop: "25px" }}
                      />
                      <input
                        type="text"
                        className="nameInput"
                        placeholder={`이름: ${name}`}
                        disabled
                      />
                      <input
                        type="text"
                        className="serialnumberInput"
                        placeholder={`시리얼넘버: ${serialNumber}`}
                        disabled
                      />
                      <input
                        type="text"
                        className="phoneInput"
                        placeholder={`전화번호: ${phoneNumber}`}
                        disabled
                      />
                      <hr
                        className="hr"
                        style={{ marginBottom: "10px", marginTop: "25px" }}
                      />
                      <input
                        ref={ageRef}
                        type="text"
                        className="ageInput"
                        placeholder={`연령: ${80}`}
                        onChange={(e) => setAgeNumber(e.target.value)}
                      />
                      <div>
                        <input
                          ref={timeRef1}
                          type="time"
                          className="timeInput"
                          value
                          onChange={(e) => setTimeNumber1(e.target.value)}
                        />
                        &nbsp; ~ &nbsp;
                        <input
                          ref={timeRef2}
                          type="time"
                          className="timeInput"
                          onChange={(e) => setTimeNumber2(e.target.value)}
                        />
                      </div>
                      <hr
                        className="hr"
                        style={{ marginBottom: "10px", marginTop: "25px" }}
                      />
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
                  <Button
                    variant="outline-danger"
                    className="withdraw_button"
                    onClick={() => {
                      axios({
                        method: "delete",
                        url: `http://15.165.98.14:8080/users/withdraw/${serialNumber}`,
                        headers: {
                          Authorization: `Bearer ${
                            JSON.parse(localStorage.getItem("token"))
                              .accessToken
                          }`,
                        },
                      }).then(() => {
                        console.log("회원탈퇴 성공!");
                        localStorage.removeItem("token");
                        navigate("/main", { replace: true });
                      });
                    }}
                  >
                    회원탈퇴
                  </Button>
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
            <input
              type="password"
              style={{ textAlign: "center" }}
              className="mypagepwInput"
              placeholder="비밀번호 확인"
              onChange={(e) => setPassword(e.target.value)}
            />
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
