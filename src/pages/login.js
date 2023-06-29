import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import Myheader from "../components/header";
import axios from "axios";

const LOGIN = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    pw: "",
  });

  const changeLoginInfo = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // const signIn = () => {
  //   if (loginInfo.email === "" || loginInfo.pw === "") {
  //     alert("아이디와 비밀번호를 입력해주세요.");
  //     return;
  //   }

  //   const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  //   const foundUser = storedUsers.find(
  //     (user) => user.email === loginInfo.email && user.password === loginInfo.pw
  //   );

  //   if (foundUser) {
  //     localStorage.setItem(
  //       "userId",
  //       JSON.stringify({
  //         id: foundUser.username,
  //       })
  //     );
  //     alert("로그인 성공!");
  //   } else {
  //     alert("아이디 또는 비밀번호를 확인하세요.");
  //   }
  // };

  // useEffect(() => {
  //   if (loginInfo.email !== "" && loginInfo.pw !== "") {
  //     handleLogin();
  //   }
  // }, [loginInfo]);

  const handleLogin = () => {
    if (loginInfo.email === "" || loginInfo.pw === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    axios({
      method: "post",
      url: "http://15.165.98.14:8080/users/login",
      data: {
        email: loginInfo.email,
        password: loginInfo.pw,
      },
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data));
        localStorage.setItem("userId", "abc");
        navigate("/service", { replace: true });
      })
      .catch((err) => {
        window.alert(err.data);
      });
  };

  return (
    <div className="login" style={{ height: "814px" }}>
      <Myheader />
      <Fragment>
        <div className="login_container">
          <div className="login_frame">
            <div className="loginFrame_left">
              <div className="left_btn_area">
                <Link to="/main">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
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
                <span
                  className="loginregisters"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  회원가입
                </span>
              </div>
              <div className="login_loginArea">
                <form>
                  <input
                    type="email"
                    className="emailInput"
                    placeholder="아이디(example@gmail.com)"
                    name="email"
                    onChange={changeLoginInfo}
                  />
                  <input
                    type="password"
                    className="pwInput"
                    placeholder="비밀번호"
                    name="pw"
                    onChange={changeLoginInfo}
                  />
                  <br />
                  <Link to="/findid">
                    <span className="findId">아이디 · 비밀번호 찾기</span>
                  </Link>
                </form>
                <div className="loginbuttonarea">
                  <button
                    type="submit"
                    className="loginButton"
                    onClick={handleLogin}
                  >
                    로그인
                  </button>
                  <Link to="/main">
                    <button type="submit" className="loginButton loginButton2">
                      로그인 없이 보기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="loginArea_right">
              <span className="platformTextbox">Sign Up Now</span>
              <span className="platformTextbox2">
                {/* 로그인해서 저희 서비스를 이용해 보세요. */}
              </span>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default LOGIN;
