import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

import Myheader from "../components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from "react-bootstrap";
import "../style/accordion.css";

const FAQ = () => {
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(false);

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  // email contact
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "cs.s.with@gmail.com",
        "template_2md8tjf",
        form.current,
        "DvatRb3CY3WIvoXSp"
      )
      .then(
        (result) => {
          alert(
            "성공적으로 접수되었습니다. \n(주말/ 공휴일/ 평일 19시 이후는 답변이 늦어질 수 있습니다.)"
          );
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert("전송이 실패되었습니다.");
        }
      );
  };

  return (
    <div>
      <Myheader isLogin={sessionId} />
      <center>
        <div style={{ width: "65%", marginTop: "50px", marginBottom: "50px" }}>
          <h1>Q & A</h1>
        </div>
      </center>
      <div className="question">
        <div
          className="faq"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: 30,
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>자주묻는질문</h2>
          <div className="faq_accordion" style={{ width: "80%" }}>
            <Accordion defaultActiveKey="0" className="mt-5 p-3">
              <Accordion.Item eventKey="0" className="item">
                <Accordion.Header>자주 묻는 질문1</Accordion.Header>
                <Accordion.Body>
                  python • Who wanted to go to the Snake Park in Nairobi and pay
                  two shillings just to see a python? • The voices were cut off
                  as suddenly as the squeaks of a mouse were stifled by the
                  lightning grip of his python. • Along came a man carrying a
                  large python. • I found myself in front of the reticulated
                  python. • At first it appeared to be empty, but then, on the
                  dappled ground, I saw a rock python. • A tongue or a mouse's
                  tail retracts within the lipless smile of a green tree python.
                  • Around the coast and in river valleys there are stretches of
                  tropical jungle with pythons and other snakes.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" className="item">
                <Accordion.Header>자주 묻는 질문2</Accordion.Header>
                <Accordion.Body>
                  python • Who wanted to go to the Snake Park in Nairobi and pay
                  two shillings just to see a python? • The voices were cut off
                  as suddenly as the squeaks of a mouse were stifled by the
                  lightning grip of his python. • Along came a man carrying a
                  large python. • I found myself in front of the reticulated
                  python. • At first it appeared to be empty, but then, on the
                  dappled ground, I saw a rock python. • A tongue or a mouse's
                  tail retracts within the lipless smile of a green tree python.
                  • Around the coast and in river valleys there are stretches of
                  tropical jungle with pythons and other snakes.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="item">
                <Accordion.Header>자주 묻는 질문3</Accordion.Header>
                <Accordion.Body>
                  python • Who wanted to go to the Snake Park in Nairobi and pay
                  two shillings just to see a python? • The voices were cut off
                  as suddenly as the squeaks of a mouse were stifled by the
                  lightning grip of his python. • Along came a man carrying a
                  large python. • I found myself in front of the reticulated
                  python. • At first it appeared to be empty, but then, on the
                  dappled ground, I saw a rock python. • A tongue or a mouse's
                  tail retracts within the lipless smile of a green tree python.
                  • Around the coast and in river valleys there are stretches of
                  tropical jungle with pythons and other snakes.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4" className="item">
                <Accordion.Header>자주 묻는 질문4</Accordion.Header>
                <Accordion.Body>
                  python • Who wanted to go to the Snake Park in Nairobi and pay
                  two shillings just to see a python? • The voices were cut off
                  as suddenly as the squeaks of a mouse were stifled by the
                  lightning grip of his python. • Along came a man carrying a
                  large python. • I found myself in front of the reticulated
                  python. • At first it appeared to be empty, but then, on the
                  dappled ground, I saw a rock python. • A tongue or a mouse's
                  tail retracts within the lipless smile of a green tree python.
                  • Around the coast and in river valleys there are stretches of
                  tropical jungle with pythons and other snakes.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5" className="item">
                <Accordion.Header>자주 묻는 질문5</Accordion.Header>
                <Accordion.Body>
                  python • Who wanted to go to the Snake Park in Nairobi and pay
                  two shillings just to see a python? • The voices were cut off
                  as suddenly as the squeaks of a mouse were stifled by the
                  lightning grip of his python. • Along came a man carrying a
                  large python. • I found myself in front of the reticulated
                  python. • At first it appeared to be empty, but then, on the
                  dappled ground, I saw a rock python. • A tongue or a mouse's
                  tail retracts within the lipless smile of a green tree python.
                  • Around the coast and in river valleys there are stretches of
                  tropical jungle with pythons and other snakes.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className="email_contact">
          <h2 className="em_title">Email Contact</h2>
          <form ref={form} onSubmit={sendEmail}>
            <label>연락 받을 Email</label>
            <br />
            <input
              type="email"
              name="from_email"
              placeholder="ex)abcd@gmail.com"
              required
            />
            <br />
            <label>문의 제목</label>
            <br />
            <input
              type="text"
              name="mail_title"
              maxLength={25}
              placeholder="제목을 입력해주세요. (25자 이내)"
            />
            <br />
            <label>문의 내용</label>
            <br />
            <textarea
              name="mail_content"
              required
              placeholder="문의 내용을 입력해주세요."
            />
            <br />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
