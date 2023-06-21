import React, { useEffect, useState } from "react";
import Myheader from "../components/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from "react-bootstrap";
import "../style/accordion.css"

const FAQ = () => {
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(false);

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  return (
    <div>
      <Myheader isLogin={sessionId} />
      <center>
      <div style={{ width: '65%', marginTop: '50px'}}>
        <h1>Q & A</h1>
      </div>
      </center>
      <div className="faq" style={{ width: '65%', marginTop: '-20px', display: "flex", justifyContent: "center", alignItems: "center", margin: 'auto' }}>
        <div className="faq_accordion" style={{ width: "65%" }}>
          <Accordion defaultActiveKey="0" className="mt-5 p-3">
            <Accordion.Item eventKey="0" className="item">
              <Accordion.Header>자주 묻는 질문1</Accordion.Header>
              <Accordion.Body>
                python
                • Who wanted to go to the Snake Park in Nairobi and pay two shillings just to see a python?
                • The voices were cut off as suddenly as the squeaks of a mouse were stifled by the lightning grip of his python.
                • Along came a man carrying a large python.
                • I found myself in front of the reticulated python.
                • At first it appeared to be empty, but then, on the dappled ground, I saw a rock python.
                • A tongue or a mouse's tail retracts within the lipless smile of a green tree python.
                • Around the coast and in river valleys there are stretches of tropical jungle with pythons and other snakes.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="item">
              <Accordion.Header>자주 묻는 질문2</Accordion.Header>
              <Accordion.Body>
                python
                • Who wanted to go to the Snake Park in Nairobi and pay two shillings just to see a python?
                • The voices were cut off as suddenly as the squeaks of a mouse were stifled by the lightning grip of his python.
                • Along came a man carrying a large python.
                • I found myself in front of the reticulated python.
                • At first it appeared to be empty, but then, on the dappled ground, I saw a rock python.
                • A tongue or a mouse's tail retracts within the lipless smile of a green tree python.
                • Around the coast and in river valleys there are stretches of tropical jungle with pythons and other snakes.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className="item">
              <Accordion.Header>자주 묻는 질문3</Accordion.Header>
              <Accordion.Body>
                python
                • Who wanted to go to the Snake Park in Nairobi and pay two shillings just to see a python?
                • The voices were cut off as suddenly as the squeaks of a mouse were stifled by the lightning grip of his python.
                • Along came a man carrying a large python.
                • I found myself in front of the reticulated python.
                • At first it appeared to be empty, but then, on the dappled ground, I saw a rock python.
                • A tongue or a mouse's tail retracts within the lipless smile of a green tree python.
                • Around the coast and in river valleys there are stretches of tropical jungle with pythons and other snakes.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4" className="item">
              <Accordion.Header>자주 묻는 질문4</Accordion.Header>
              <Accordion.Body>
                python
                • Who wanted to go to the Snake Park in Nairobi and pay two shillings just to see a python?
                • The voices were cut off as suddenly as the squeaks of a mouse were stifled by the lightning grip of his python.
                • Along came a man carrying a large python.
                • I found myself in front of the reticulated python.
                • At first it appeared to be empty, but then, on the dappled ground, I saw a rock python.
                • A tongue or a mouse's tail retracts within the lipless smile of a green tree python.
                • Around the coast and in river valleys there are stretches of tropical jungle with pythons and other snakes.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5" className="item">
              <Accordion.Header>자주 묻는 질문5</Accordion.Header>
              <Accordion.Body>
                python
                • Who wanted to go to the Snake Park in Nairobi and pay two shillings just to see a python?
                • The voices were cut off as suddenly as the squeaks of a mouse were stifled by the lightning grip of his python.
                • Along came a man carrying a large python.
                • I found myself in front of the reticulated python.
                • At first it appeared to be empty, but then, on the dappled ground, I saw a rock python.
                • A tongue or a mouse's tail retracts within the lipless smile of a green tree python.
                • Around the coast and in river valleys there are stretches of tropical jungle with pythons and other snakes.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>

  );
};

export default FAQ;