import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/loginScreen.css";
import Myheader from "../components/header";

const LOGIN = () => {
  const navigate = useNavigate();
  const [idInfo, setIdInfo] = useState({
    id: "",
    pw: "",
  });

  const changeIdPw = (e) => {
    const { name, value } = e.target;
    setIdInfo({ ...idInfo, [name]: value });
  };

  const signIn = (e) => {
    e.preventDefault();

    if (idInfo.id === "" || idInfo.pw === "") {
      alert("닉네임과 비밀번호를 입력해주세요.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(
      (user) => user.username === idInfo.id && user.password === idInfo.pw
    );

    if (foundUser) {
      localStorage.setItem(
        "userId",
        JSON.stringify({
          id: idInfo.id,
        })
      );
      alert("로그인 성공!");
      navigate("/service");
    } else {
      alert("닉네임 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="login">
      <Myheader />
      <Fragment>
        <div className="container">
          <div className="loginFrame_login">
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
            <Link to="/signup">
              <span className="registers">Register</span>
            </Link>
            <div className="loginArea_login">
              <form>
                <input
                  type="text"
                  className="idInput"
                  placeholder="닉네임"
                  name="id"
                  onChange={changeIdPw}
                />
                <input
                  type="password"
                  className="pwInput"
                  placeholder="비밀번호"
                  name="pw"
                  onChange={changeIdPw}
                />
                <br />
                <Link to="/findid">
                  <span className="findId">Forgot your Password?</span>
                </Link>
              </form>
              <div className="loginbuttonarea">
                <button type="submit" className="sbButton" onClick={signIn}>
                  로그인
                </button>
                <Link to="/main">
                  <button type="submit" className="sbButton sbButton2">
                    로그인 없이 보기
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="platform_login">
            <span className="platformTextbox">Sign Up Now</span>
            <span className="platformTextbox2">
              Create a new account and connect with others.
            </span>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default LOGIN;
