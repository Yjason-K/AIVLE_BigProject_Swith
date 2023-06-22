import { useEffect, useState } from "react";
import Myheader from "../components/header";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const UncontrolledExample = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://imgscf.slidemembers.com/docs/1/1/354/service_introduction_page_template_353421.jpg"
          width="800px" height="500px"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://imgscf.slidemembers.com/docs/1/1/354/service_introduction_page_template_353423.jpg"
          width="800px" height="500px"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

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
      <Myheader isLogin={sessionId} />
      <br /><br />
      <UncontrolledExample />
      <div className="feature_list" style={{ marginTop: "40px" }}>
        <div className="feature_name" style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto', width: '75%' }}>
          <span style={{ width: "350px" }}><center>특징1</center></span>
          <span style={{ width: "350px" }}><center>특징2</center></span>
          <span style={{ width: "350px" }}><center>특징3</center></span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto', width: "75%", marginTop: "10px" }}>
          <div>
            <img src="https://cdn.icon-icons.com/icons2/1104/PNG/512/wifi_78927.png" width={"350px"} height={"200px"} alt="Image 1" />
          </div>
          <div>
            <img src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13156879&filePath=L2Rpc2sxL25ld2RhdGEvMjAxOC8yMS9DTFMxLzEzMTU2ODc5X0NPTENUXzIwMTgxMTI2XzE=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004" width={"350px"} height={"200px"} alt="Image 3" />
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVxHHVicJIFxqQLE1neN1YxY7MzqrbcTX2w&usqp=CAU" width={"350px"} height={"200px"} alt="Image 2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOME;
