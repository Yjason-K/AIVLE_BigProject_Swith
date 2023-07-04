import { Fragment, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Myheader from "../components/header";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import "../style/singup.css";
import jaerong from "../img/jaerong.png";

const SIGNUP = () => {
  const navigate = useNavigate();
  const [isCheckOne, setIsCheckOne] = useState(false);
  const [isCheckTwo, setIsCheckTwo] = useState(false);
  const isCheck = isCheckOne && isCheckTwo;
  const termsOfService1 = `
    `;

  const termsOfService2 = `
  `;
  const nameRef = useRef();
  const nicknameRef = useRef();
  const emailRef = useRef();
  const confirmPwRef = useRef();
  const ageRef = useRef();
  const serialnumberRef = useRef();

  const [idInfo, setIdInfo] = useState({
    name: "",
    id: "",
    pw: "",
    checkpw: "",
    serialnumber: "",
    phone: "",
    email: "",
    agenumber: ""
  });

  const [showpw, setShowPw] = useState("password");
  const nameRegex = /^[^\d\s!@#$%^&*]+$/;
  const pwRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const [showNameTooltip, setShowNameTooltip] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [showPwTooltip, setShowPwTooltip] = useState(false);

  const handleEmailChange = (e) => {
    const { value } = e.target;

    if (!value) {
      setEmailErrorMessage('이메일을 입력해주세요.');
      setShowEmailTooltip(true);
    } else if (!emailRegex.test(value)) {
      setEmailErrorMessage('올바른 이메일 형식이 아닙니다.(example@naver.com)');
      setShowEmailTooltip(true);
    } else {
      setEmailErrorMessage('');
      setShowEmailTooltip(false);
    }

    setIdInfo({ ...idInfo, email: value });
  };

  const handleEmailError = () => {
    setShowEmailTooltip(true);
    emailRef.current.focus({ preventScroll: true });
  };

  const handlePwError = () => {
    setShowPwTooltip(true);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!emailRegex.test(idInfo.email)) {
      handleEmailError();
      setShowEmailTooltip(true);
      return;
    }
    if (!pwRegex.test(idInfo.pw)) {
      handlePwError();
      setShowPwTooltip(true);
      return;
    }
  };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pw: "",
    checkpw: ""
  });

  const setinfo = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        if (!nameRegex.test(value)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            name: '이름에는 숫자나 특수문자를 포함할 수 없습니다.'
          }));
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            name: ''
          }));
        }
        break;
      case 'pw':
        if (!pwRegex.test(value)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            pw: '비밀번호는 8 ~ 30자 사이, 숫자 1개 이상, 특수문자 1개 이상 포함해야 합니다.'
          }));
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            pw: ''
          }));
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: '이메일 형식이 올바르지 않습니다. (example@naver.com)'
          }));
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: ''
          }));
        }
        break;
      default:
        break;
    }

    setIdInfo({ ...idInfo, [name]: value });
  };

  const handleNameChange = (e) => {
    const { value } = e.target;

    if (!value) {
      setNameErrorMessage('');
      setShowNameTooltip(false);
    } else if (!nameRegex.test(value)) {
      setNameErrorMessage('이름에는 숫자나 특수문자를 포함할 수 없습니다.');
      setShowNameTooltip(true);
    } else {
      setNameErrorMessage('');
      setShowNameTooltip(false);
    }

    setIdInfo({ ...idInfo, name: value });
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

    const pwRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    if (!pwRegex.test(idInfo.pw)) {
      alert("비밀번호는 8 ~ 30자 사이, 숫자 1개 이상, 특수문자 1개 이상 포함해야 합니다.");
      return;
    }

    if (idInfo.pw !== idInfo.checkpw) {
      alert("비밀번호가 일치하지 않습니다.");
      confirmPwRef.current.focus();
      return;
    }

    const age = Number(idInfo.agenumber);
    if (isNaN(age) || age < 0 || age > 121) {
      alert("연령은 0~120 사이의 값이어야 합니다.");
      ageRef.current.focus();
      return;
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(idInfo.email)) {
      alert("이메일 형식이 올바르지 않습니다. (example@naver.com)");
      emailRef.current.focus();
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isUserExist = existingUsers.some(
      (user) => user.username === idInfo.id
    );
    if (isUserExist) {
      alert("이미 존재하는 닉네임입니다.");
      nicknameRef.current.focus();
      return;
    }

    const isEmailExist = existingUsers.some(
      (user) => user.email === idInfo.email
    );
    if (isEmailExist) {
      alert("이미 등록된 이메일입니다.");
      emailRef.current.focus();
      return;
    }

    const isSerialExist = existingUsers.some(
      (user) => user.serialnumber === idInfo.serialnumber
    );
    if (isSerialExist) {
      alert("이미 존재하는 시리얼넘버입니다.");
      serialnumberRef.current.focus();
      return;
    }

    const newUser = {
      username: idInfo.id,
      password: idInfo.pw,
      name: idInfo.name,
      serialnumber: idInfo.serialnumber,
      phone: idInfo.phone,
      email: idInfo.email
    };
    existingUsers.push(newUser);

    const data = {
      name: idInfo.name,
      nickname: idInfo.id,
      password: idInfo.pw,
      serialNumber: idInfo.serialnumber,
      phoneNumber: idInfo.phone,
      email: idInfo.email,
    };
    console.log("보내는 데이터", data);

    axios({
      method: "post",
      url: "http://15.165.98.14:8080/users/signup",
      data: {
        name: idInfo.name,
        nickname: idInfo.id,
        password: idInfo.pw,
        serialNumber: idInfo.serialnumber,
        phoneNumber: idInfo.phone,
        email: idInfo.email,
      },
    })
      .then((res) => {
        alert("회원가입 성공!");
        navigate("/login");
        console.log("회원가입 성공!");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.field === "name" && err.response.data.defaultMessage) {
          const errorMessage = err.response.data.defaultMessage;
          alert(errorMessage);
          nameRef.current.focus();
        } else {
          window.alert(err.response.data);
        }
      });
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
                <div onClick={() =>
                  !isCheck && alert("이용 약관에 모두 동의해주세요.")
                }>
                  <div className='nametooltipContainer'>
                    <input
                      ref={nameRef}
                      type="text"
                      className="nameInput"
                      required
                      minLength={2}
                      placeholder="이름(2글자 이상)"
                      name="name"
                      pattern="^[^\d\s!@#$%^&*]+$"
                      onChange={handleNameChange}
                      disabled={!isCheck}
                    />
                    {showNameTooltip && (
                      <div className="tooltiptext">이름에는 숫자나 특수문자를 포함할 수 없습니다.</div>
                    )}
                  </div>
                  <div className='emailtooltipContainer'>
                    <input
                      ref={emailRef}
                      type="email"
                      className="emailInput"
                      required
                      placeholder="아이디(example@gmail.com)"
                      name="email"
                      onChange={handleEmailChange}
                      disabled={!isCheck}
                    />
                    {showEmailTooltip && (
                      <div className="tooltiptext">{emailErrorMessage}</div>
                    )}
                  </div>

                  <div className='pwdtooltipContainer'>
                    <input
                      type={showpw}
                      className="pwInput"
                      required
                      minLength="8"
                      placeholder="비밀번호(8글자 이상)"
                      name="pw"
                      onChange={setinfo}
                      disabled={!isCheck}
                    />
                    {errors.pw && (
                      <div className="tooltiptext">{errors.pw}</div>
                    )}
                  </div>

                  <input
                    ref={confirmPwRef}
                    type={showpw}
                    className="pwInput"
                    required
                    minLength="8"
                    placeholder="비밀번호 확인"
                    name="checkpw"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />

                  <input
                    ref={nicknameRef}
                    type="text"
                    className="idInput"
                    required
                    minLength="4"
                    placeholder="닉네임(4글자 이상)"
                    name="id"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />

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
                  <hr
                    className="hr"
                    style={{ marginBottom: "0px", marginTop: "15px" }}
                  />

                  <input
                    ref={serialnumberRef}
                    type="text"
                    className="serialnumberInput"
                    required
                    placeholder="시리얼넘버"
                    name="serialnumber"
                    onChange={setinfo}
                    disabled={!isCheck}
                  />
                  {/* 시리얼번호 안내 버튼 */}
                  <Button
                    className="btn-custom"
                    onClick={() => {
                      if (isCheck) {
                        setShowModal(true);
                      }
                    }}
                  >
                    시리얼 번호 안내
                  </Button>

                  <hr
                    className="hr"
                    style={{ marginBottom: "0px", marginTop: "15px" }}
                  />

                  <div className="tooltipContainer ageInputContainer">
                    <input
                      ref={ageRef}
                      type="number"
                      min="0"
                      max="120"
                      className="ageInput"
                      required
                      placeholder="연령(00)"
                      name="agenumber"
                      onChange={setinfo}
                      disabled={!isCheck}
                    />
                    <div className="tooltiptext">영유아와 고령자한테 제공되는<br />알림 종류가 각각 다릅니다!</div>
                  </div>

                  <div className='timeinput_area'>
                    <div className="tooltipContainer timeInputContainer">
                      <input
                        type="time"
                        className="timeInput"
                        required
                        name="timenumber1"
                        onChange={setinfo}
                        disabled={!isCheck}
                      />
                      &nbsp; ~ &nbsp;
                      &nbsp; ~ &nbsp;
                      <input
                        type="time"
                        className="timeInput"
                        required
                        name="timenumber2"
                        onChange={setinfo}
                        disabled={!isCheck}
                      />
                      <div className="tooltiptext">이용 시간대를 설정해주세요.</div>
                    </div>
                  </div>
                </div>

                <label className="showPw">
                  <input
                    type="checkbox"
                    className="showPw"
                    onClick={showPwBt}
                    disabled={!isCheck}
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
            <div>
              <h1 className="h3 mb-3 fw-normal">이용 약관</h1>
              <textarea
                style={{ resize: "none", width: "86%", height: "250px" }}
                value={termsOfService1}
                readOnly
              ></textarea>
              <div className="checkbox-container">
                &nbsp;&nbsp;&nbsp;개인 정보 수집 및 이용 약관에 동의합니다.&nbsp;
                <input
                  type="checkbox"
                  onChange={() => setIsCheckOne(!isCheckOne)}
                />
              </div>
              <br />
              <br />
              <br />
              <textarea
                style={{ resize: "none", width: "86%", height: "250px" }}
                value={termsOfService2}
                readOnly
              ></textarea>
              <div className="checkbox-container">
                &nbsp;&nbsp;&nbsp;개인 정보 보호 약관에 동의합니다.&nbsp;
                <input
                  type="checkbox"
                  onChange={() => setIsCheckTwo(!isCheckTwo)}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
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
              시리얼 번호는 기기 고유 번호로, 특정 기기에만 사용되는 번호입니다.
              시리얼 번호를 입력하면 해당 기기에 대한 정보를 확인할 수 있습니다.
            </p>
            <p>
              시리얼 번호는 기기 상단 또는 하단에 있는 레이블 또는 포장 상자에
              기록되어 있습니다.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    </div >
  );
};

export default SIGNUP;
