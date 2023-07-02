import React, { useEffect, useState, useRef } from "react";
import Myheader from "../components/header";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import service1 from "../img/home_service1.png";
import service2 from "../img/home_service2.png";
import service3 from "../img/home_service3.png";
import "../style/home.css"
import ScrollToTopButton from "../components/ScrollToTopButton";

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
            alt="1st slide"
          />
          <Carousel.Caption style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
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
            alt="2nd slide"
          />
          <Carousel.Caption style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
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
            alt="3rd slide"
          />
          <Carousel.Caption style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <h3>안전사고가 일어나도 걱정마세요!</h3>
            S.with 서비스는 위험 상황 발생 즉시 알림을 보내 골든 타임을 확보하고,<br />
            빠른 대처를 통해 2차 사고 예방이 가능합니다.<br />이제 고민을 덜고, 사랑하는 이들을 위해 S.with 서비스를 선택하세요.
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </center>
  );
};

const HOME = () => {
  const session = localStorage.getItem("toekn");
  const [sessionId, setSessionId] = useState(false);
  const featureDetail1Ref = useRef(null);
  const featureDetail2Ref = useRef(null);

  const handleScrollToFeatureDetail1 = () => {
    if (featureDetail1Ref.current) {
      featureDetail1Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToFeatureDetail2 = () => {
    if (featureDetail2Ref.current) {
      featureDetail2Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  return (
    <div className="main_page" style={{ width: "100%", height: "100%" }}>
      <div style={{ marginBottom: "100px" }}>
        <Myheader isLogin={sessionId} />
      </div>
      <div style={{ marginBottom: "50px" }}>
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
            <center>WIFI Pose estimation</center>
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
              width={"50%"}
              height={"100%"}
              alt="Image 1"
            />
          </div>
          <div className="view_button">
            <button className="view_detail" onClick={handleScrollToFeatureDetail1}>자세히 알아보기</button>
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
            <center>IP Camera</center>
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
              width={"50%"}
              height={"100%"}
              alt="Image 3"
            />
          </div>
          <div className="view_button">
            <button className="view_detail" onClick={handleScrollToFeatureDetail2}>자세히 알아보기</button>
          </div>
        </div>
      </div>

      <div className="hr_line">
        <center>
          <hr style={{ width: "80%" }} />
        </center>
      </div>
      <div>
        <div className="feature_detail" id="feature_detail1" ref={featureDetail1Ref}>
          <div className="feature_detail1">
            <h2>WIFI Pose estimation</h2>
            WIFI Pose Estimation(와이파이 포즈 추정)은 Wi-Fi 신호를 이용하여 사용자의 위치와 동작을 추정하는 기술입니다.
            일반적으로 Wi-Fi 신호는 무선 액세스 포인트(AP)를 통해 발신되고 수신되는데, 이 신호의 특성을 활용하여 사용자의 위치를 추정하고 동작을 감지할 수 있습니다.<br /><br />
            Wi-Fi Pose Estimation은 주로 다음과 같은 과정을 거쳐 동작합니다.<br /><br />
            1. 신호 수집 : Wi-Fi 액세스 포인트(AP)에서 발신되는 Wi-Fi 신호를 수집합니다.<br />
            2. 신호 처리 : 수집된 Wi-Fi 신호 데이터를 처리하여 신호의 세기, 강도, 도착 시간 등과 같은 특성을 추출합니다.<br />
            3. 포즈(위치와 동작) 추정 : 추출된 Wi-Fi 신호 특성을 기반으로 사용자의 동작을 추정합니다. 이를 위해 머신러닝, 딥러닝 및 신호 처리 기술 등이 사용됩니다.<br />
            4. 결과 제공 : 추정된 사용자의 동작 정보를 활용하여 위험 상황을 감지하고 이용자에게 알림을 제공합니다.
          </div>
          <div className="feature_detail1_picture">
            <img src="https://d3i71xaburhd42.cloudfront.net/108c50a2de9ea4e912e51d07ae90705221cbbc48/5-Figure1-1.png" style={{ height: "400px" }} alt="asdf" />
          </div>
        </div>
      </div>

      <div className="hr_line">
        <center>
          <hr style={{ width: "80%" }} />
        </center>
      </div>
      <div>
        <div className="feature_detail" id="feature_detail2" ref={featureDetail2Ref}>
          <div className="feature_detail2">
            <h2>IP Camera</h2>
            IP 카메라 포즈 추정(IP camera pose estimation)은 컴퓨터 비전과 컴퓨터 그래픽스 분야에서 사용되는 기술입니다. 이 기술은 IP 카메라에서 캡처된 영상을 기반으로 카메라의 위치와 방향(포즈)을 추정하는 것을 의미합니다.<br /><br />

            IP 카메라 포즈 추정은 주로 다음과 같은 과정을 거칩니다.<br /><br />

            1. 영상 처리 : IP 카메라로부터 수신된 영상을 처리합니다. 이 단계에서는 영상 내의 주요 특징점을 탐지하거나 추출하는 등의 작업이 수행됩니다.<br />

            2. 특징점 매칭 : 영상 내의 특징점들을 다른 프레임이나 3D 모델의 특징점과 매칭시킵니다. 이를 통해 영상의 특징점들과 3D 공간 상의 대응점을 찾을 수 있습니다.<br />

            3. 카메라 포즈 추정 : 매칭된 특징점들을 사용하여 카메라의 위치와 방향을 추정합니다.<br />

            4. 결과 제공 : 추정된 카메라 포즈 정보를 활용하여 다양한 응용분야에서 활용할 수 있습니다. 예를 들어 가상 현실(VR), 확장 현실(AR), 실시간 모션 추적 등에 활용될 수 있습니다.
          </div>
          <div className="feature_detail2_picture">
            <img src="https://i.ytimg.com/vi/W1ZNFfftx2E/maxresdefault.jpg" style={{ height: "400px" }} alt="asdf" />
          </div>
        </div>
      </div>

      <div className="hr_line">
        <center>
          <hr style={{ width: "80%" }} />
        </center>
      </div>
      <ScrollToTopButton />
    </div>
  );
};
export default HOME;