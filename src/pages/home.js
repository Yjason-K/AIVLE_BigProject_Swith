import { useEffect, useState } from "react";
import Myheader from "../components/header";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const UncontrolledExample = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://imgscf.slidemembers.com/docs/1/1/354/service_introduction_page_template_353421.jpg"
          width="100%"
          height="500px"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://imgscf.slidemembers.com/docs/1/1/354/service_introduction_page_template_353423.jpg"
          width="100%"
          height="500px"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

const HOME = () => {
  const session = localStorage.getItem("toekn");
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
