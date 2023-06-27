import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/findid.css";
import Myheader from "../components/header";
import axios from "axios";

const FindID = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState("");
  const [idInfo, setIdInfo] = useState({
    email: "",
    serialnumber: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [verified, setVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setinfo = (e) => {
    const { name, value } = e.target;
    setIdInfo({ ...idInfo, [name]: value });
  };

  const findEmail = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(
      (user) => user.serialnumber === serialNumber
    );

    if (foundUser) {
      setIdInfo((prev) => ({ ...prev, email: foundUser.email }));
      alert(`찾은 아이디: ${foundUser.email}`);
    } else {
      alert("시리얼 번호를 확인하세요.");
    }

    // axios(
    //   {
    //     method: "get",
    //     url: "asdfasd",
    //   data:{
    //     email: idInfo.email,
    //     serialNumber: idInfo.serialnumber
    //   }
    //   }).then((res) => {

    //   }).catch((err) => {

    //   })
  };

  const verifyUser = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(
      (user) =>
        user.email === idInfo.email && user.serialnumber === idInfo.serialnumber
    );

    if (foundUser) {
      setVerified(true);
    } else {
      alert("이메일 또는 시리얼번호를 확인하세요.");
    }
  };

  const resetPassword = (e) => {
    e.preventDefault();

    if (idInfo.newPassword !== idInfo.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const foundUser = storedUsers.find(
      (user) =>
        user.email === idInfo.email && user.serialnumber === idInfo.serialnumber
    );

    if (foundUser) {
      foundUser.password = idInfo.newPassword;
      localStorage.setItem("users", JSON.stringify(storedUsers));
      alert("비밀번호가 성공적으로 재설정되었습니다!");
      setVerified(false);
      setIdInfo({
        email: "",
        serialnumber: "",
        newPassword: "",
        confirmPassword: "",
      });
      navigate("/login");
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
      <div className="find_pwd">
        {!verified ? (
          <>
            <div style={{ height: "auto" }}>
              <center>
                <div className="find_id">
                  <h1>아이디 찾기</h1>
                  <div className="findEmailArea">
                    <form onSubmit={findEmail}>
                      <input
                        type="text"
                        className="emailInput"
                        required
                        placeholder="시리얼번호 입력"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        key="serialNumber"
                      />
                      <button
                        type="submit"
                        className="findid_button"
                        style={{ marginTop: "1px" }}
                      >
                        아이디 찾기
                      </button>
                    </form>
                  </div>
                </div>
                <div style={{ marginTop: "100px" }}>
                  <h1>비밀번호 찾기</h1>
                  <div className="verifyArea">
                    <form onSubmit={verifyUser}>
                      <input
                        type="email"
                        className="emailInput"
                        required
                        placeholder="아이디(example@gmail.com)"
                        name="email"
                        onChange={setinfo}
                        value={idInfo.email}
                        key="email"
                      />
                      <input
                        type="text"
                        className="serialnumberInput"
                        required
                        placeholder="시리얼번호"
                        name="serialnumber"
                        onChange={setinfo}
                        key="serialnumber"
                      />
                      <button
                        type="submit"
                        className="findid_button"
                        style={{ marginTop: "1px" }}
                      >
                        비밀번호 초기화
                      </button>
                    </form>
                  </div>
                </div>
              </center>
            </div>

          </>
        ) : (
          <>
            <div className="resetpwd">
              <center>
                <h3 className="subtitle">
                  새로운 비밀번호를 입력하세요.
                  <br />
                  (6자 이상)
                </h3>
                <div className="resetPasswordArea">
                  <form onSubmit={resetPassword}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="newPasswordInput"
                      required
                      placeholder="새 비밀번호"
                      name="newPassword"
                      onChange={setinfo}
                      key="newPassword"
                      minLength="6"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="confirmPasswordInput"
                      required
                      placeholder="비밀번호 확인"
                      name="confirmPassword"
                      onChange={setinfo}
                      key="confirmPassword"
                      minLength="6"
                    />
                    <br />
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        onChange={togglePasswordVisibility}
                      />
                      비밀번호 표시
                    </label>
                    <button type="submit" className="resetpwd_button">
                      비밀번호 변경
                    </button>
                  </form>
                </div>
              </center>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FindID;
