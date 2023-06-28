import { useEffect, useState } from "react";
import Myheader from "../components/header";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import service1 from "../img/home_service1.png";
import service2 from "../img/home_service2.png";
import service3 from "../img/home_service3.png";

const UncontrolledExample = () => {
  return (
    <center>
      <Carousel style={{ width: "80%" }}>
      <Carousel.Item>
          <img
            className="d-block w-100"
            src={service1}
            width="100%"
            height="500px"
            alt="Second slide"
          />
          <Carousel.Caption style={{color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
            <h3>집에서 한시라도 눈을 뗄 수가 없나요?</h3>
            사랑하는 이들의 안전을 지키기 위해 많은 고민을 하고 있다면<br /> S.with 서비스를 이용하는 것은 어떠신가요?
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={service2}
            width="100%"
            height="500px"
            alt="First slide"
          />
          <Carousel.Caption style={{color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
            <h3>S.with 서비스는 WIFI와 IP카메라를 활용한<br /> 위험 상황 감지가 가능합니다!</h3>
            실시간 행동 추정으로 위험 상황 감지가 가능한 AI 서비스를 이용해서 집에서도 안심하고 지내세요! 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={service3}
            width="100%"
            height="500px"
            alt="First slide"
          />
          <Carousel.Caption style={{color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
            <h3>안전사고가 일어나도 걱정마세요!</h3>
            S.with 서비스는 위험 상황 발생 시 즉각적으로 알림을 보내 골든 타임을 확보하고,<br />
            빠른 대처를 통해 2차 사고 예방이 가능합니다.<br />이제 고민을 덜고, 사랑하는 이들을 위해 S.with 서비스를 선택하세요.
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </center>
  );
};

const HOME = () => {
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(false);

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  return (
    <div className="main_page" style={{ width: "100%", height: "1000px" }}>
      <div style={{ marginBottom: "100px" }}>
        <Myheader isLogin={sessionId} />
      </div>
      <div style={{ marginBottom: "100px" }}>
        <UncontrolledExample />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
          width: "75%",
          gap: "1rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            className="feature_name"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <center>특징1</center>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
            }}
          >
            <img
              src="https://cdn.icon-icons.com/icons2/1104/PNG/512/wifi_78927.png"
              width={"100%"}
              height={"100%"}
              alt="Image 1"
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            className="feature_name"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <center>특징2</center>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
            }}
          >
            <img
              src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13156879&filePath=L2Rpc2sxL25ld2RhdGEvMjAxOC8yMS9DTFMxLzEzMTU2ODc5X0NPTENUXzIwMTgxMTI2XzE=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"
              width={"100%"}
              height={"100%"}
              alt="Image 3"
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            className="feature_name"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <center>특징3</center>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVxHHVicJIFxqQLE1neN1YxY7MzqrbcTX2w&usqp=CAU"
              width={"100%"}
              height={"100%"}
              alt="Image 2"
            />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default HOME;
