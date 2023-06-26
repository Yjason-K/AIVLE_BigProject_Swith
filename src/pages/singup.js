import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Myheader from "../components/header";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import "../style/singup.css";
import jaerong from "../img/jaerong.png";

const SIGNUP = () => {
  const navigate = useNavigate();
  const [isCheckOne, setIsCheckOne] = useState(false);
  const [isCheckTwo, setIsCheckTwo] = useState(false);
  const isCheck = isCheckOne && isCheckTwo;
  const termsOfService1 = `
  제1장 총칙

    제1조 (목적)
      이 약관은 S.WITH가 제공하는 서비스의 이용조건 및 절차, 회사와 이용자의 권리·의무
      및 책임사항 등을 규정함을 목적으로 합니다.

    제2조 (용어의 정의)
      이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
      1. "S.WITH"란 서비스를 제공하는 사업자를 말합니다.
      2. "이용자"란 "S.WITH"가 제공하는 서비스를 이용하는 이용고객을 말합니다.
      3. "서비스"란 이용자가 이용할 수 있는 "S.WITH"의 서비스를 말합니다.

  쉽고 편리한 온라인 서비스를 제공하겠습니다.`;

  const termsOfService2 = `
   개인정보보호법에 따라 S.with에 회원가입 신청하시는 분께 수집하는 개인정보의 항목,
  개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시
  불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.

  1. 수집하는 개인정보
     이용자는 회원가입을 하지 않아도 메인 서비스 및 게시판을 제외한 서비스를
    회원과 동일하게 이용할 수 있습니다. 이용자가 메인 서비스, 게시판을 이용하기
    위해 회원가입을 할 경우, S.with는 서비스 이용을 위해 필요한 최소한의 개인정보를
    수집합니다.

     회원가입 시점에 S.with가 이용자로부터 수집하는 개인정보는 아래와 같습니다.
      - 회원 가입 시 필수항목으로 닉네임, 비밀번호, 이메일, 휴대전화번호를, 선택항목으로
        주소를 수집합니다.
  
  2. 개인정보의 수집 및 이용목적
  
  3. 개인정보의 보유 및 이용기간`;
  const [idInfo, setIdInfo] = useState({
    name: "",
    id: "",
    pw: "",
    checkpw: "",
    serialnumber: "",
    phone: "",
    email: "",
    agenumber: "",
    timenumber: "",
  });
  const [showpw, setShowPw] = useState("password");

  const setinfo = (e) => {
    const { name, value } = e.target;
    setIdInfo({ ...idInfo, [name]: value });
  };

  const showPwBt = () => {
    showpw === "password" ? setShowPw("text") : setShowPw("password");
  };

  const newRegis = (e) => {
    e.preventDefault();

    if (!isCheckOne || !isCheckTwo) {
      alert("이용 약관에 모두 동의해주세요.");
      return;
    }

    if (idInfo.pw !== idInfo.checkpw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const age = Number(idInfo.agenumber);
    if (isNaN(age) || age < 0 || age > 120) {
      alert("연령은 0~120 사이의 값이어야 합니다.");
      return;
    }

    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3])~(0[0-9]|1[0-9]|2[0-3])$/;
    if (!timeRegex.test(idInfo.timenumber)) {
      alert("이용 시간대는 00~24 형식이어야 합니다.");
      return;
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(idInfo.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isUserExist = existingUsers.some(
      (user) => user.username === idInfo.id
    );
    if (isUserExist) {
      alert("이미 존재하는 닉네임입니다.");
      return;
    }

    const isEmailExist = existingUsers.some(
      (user) => user.email === idInfo.email
    );
    if (isEmailExist) {
      alert("이미 등록된 이메일입니다.");
      return;
    }

    const isSerialExist = existingUsers.some(
      (user) => user.serialnumber === idInfo.serialnumber
    );
    if (isSerialExist) {
      alert("이미 존재하는 시리얼넘버입니다.");
      return;
    }

    const timeRange = idInfo.timenumber.split("~");

    const newUser = {
      username: idInfo.id,
      password: idInfo.pw,
      name: idInfo.name,
      serialnumber: idInfo.serialnumber,
      phone: idInfo.phone,
      email: idInfo.email,
      agenumber: idInfo.agenumber,
      timenumber: timeRange,
    };
    existingUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("회원가입 성공!");
    navigate("/login");
  };

  // 시리얼 번호 찾기 안내 Modal
  const [showModal, setShowModal] = useState(false);
  const previewImgage = jaerong;

  return (
    <div className="signup">
      <Myheader />
      <Fragment>
        <div className="signup_container">
          <div className="register_frame">
            <Link to="/login">
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
            <div className="register_Area">
              <form onSubmit={newRegis}>
                <div
                  onClick={() =>
                    !isCheck && alert("이용 약관에 모두 동의해주세요.")
                  }
                >
                  <input
                    type="text"
                    className="nameInput"
                    required
                    minLength="2"
                    maxLength="5"
                    placeholder="이름(2글자 이상)"
                    name="name"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />

                  <input
                    type="email"
                    className="emailInput"
                    required
                    placeholder="아이디(example@gmail.com)"
                    name="email"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />

                  <input
                    type={showpw}
                    className="pwInput"
                    required
                    minLength="6"
                    placeholder="비밀번호(6글자 이상)"
                    name="pw"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />

                  <input
                    type={showpw}
                    className="pwInput"
                    required
                    minLength="6"
                    placeholder="비밀번호 확인(6글자 이상)"
                    name="checkpw"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />

                  <input
                    type="text"
                    className="idInput"
                    required
                    minLength="4"
                    placeholder="닉네임(4글자 이상)"
                    name="id"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />

                  <hr className="hr" style={{ marginBottom: "-10px" }} />

                  <input
                    type="text"
                    className="serialnumberInput"
                    required
                    placeholder="시리얼넘버"
                    name="serialnumber"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />
                  {/* 시리얼번호 안내 버튼 */}
                  <Button onClick={() => setShowModal(true)}>
                    시리얼 번호 안내
                  </Button>

                  <input
                    type="text"
                    className="phoneInput"
                    required
                    pattern="\d{11}"
                    maxLength="11"
                    placeholder="전화번호('-'없이 11자리)"
                    name="phone"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />

                  <hr className="hr" style={{ marginBottom: "-10px" }} />

                  <input
                    type="number"
                    min="0"
                    max="120"
                    className="ageInput"
                    required
                    placeholder="연령(00살)"
                    name="agenumber"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />

                  <input
                    type="text"
                    className="timeInput"
                    required
                    placeholder="이용 시간대(00~24)"
                    name="timenumber"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />
                </div>

                <label className="showPw">
                  <input
                    type="checkbox"
                    className="showPw"
                    onClick={showPwBt}
                  />{" "}
                  비밀번호 표시
                </label>
                <br />
                <span className="pwChecking">
                  <b>
                    <u>닉네임, 아이디는 회원 가입 후 변경 불가</u>
                  </b>
                </span>
                <button type="submit" className="register_sbButton">
                  회원가입
                </button>
              </form>
            </div>
          </div>
          <div className="register_terms_of_service">
            <h1 className="h3 mb-3 fw-normal">이용 약관</h1>
            <textarea
              style={{ resize: "none", width: "650px", height: "250px" }}
              value={termsOfService1}
              readOnly
            ></textarea>
            <div className="checkbox-container">
              서비스 이용 약관에 동의합니다.
              <input
                type="checkbox"
                onChange={() => setIsCheckOne(!isCheckOne)}
              />
            </div>
            <br />
            <br />
            <br />
            <textarea
              style={{ resize: "none", width: "650px", height: "250px" }}
              value={termsOfService2}
              readOnly
            ></textarea>
            <div className="checkbox-container">
              개인정보 수집 및 이용 약관에 동의합니다.
              <input
                type="checkbox"
                onChange={() => setIsCheckTwo(!isCheckTwo)}
              />
            </div>
          </div>
        </div>
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>시리얼 번호 안내</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {previewImgage && (
              <img
                src={previewImgage}
                alt="Preview"
                style={{ width: "100%" }}
              />
            )}
            <p>
              시리얼 번호는 기기 고유번호로 타인에게 넘어갈시 책임지지 않습니다!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    </div>
  );
};

export default SIGNUP;
