//서비스 페이지
import { useEffect, useState } from "react";
import Myheader from "../components/header";
import "../style/service.css";
import { useNavigate } from "react-router-dom";
import LOG from "../components/logComponent";

const SERVICE = () => {
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  if (!sessionId) {
    navigate("/main", { replace: true });
  }
  const [logData, setLogData] = useState();
  const [detection, setDetection] = useState();

  return (
    <div className="service">
      <Myheader isLogin={sessionId} />
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className="log_detection">이상탐지</span>
          <div className="livecam">라이브캠</div>
        </div>
        <div className="verticalContainer">
          <div className="logContainer">
            <div className="log_record">로그 기록</div>
            <div className="log_list">
              <span id="listcHead">날짜 및 시간</span>
              <span id="listcHead">로그 메세지</span>
              <span id="listcHead">Wi-fi</span>
              <span id="listcHead">CAM</span>
            </div>
            <div className="log">
              <span id="listcHead">230629_1629</span>
              <span id="listcHead">아이 낙상이 감지되었습니다.</span>
              <span id="listcHead">●</span>
              <span id="listcHead">●</span>
            </div>
            <div className="log">
              <span id="listcHead">230629_1630</span>
              <span id="listcHead">아이의 뒤집힘이 감지되었습니다.</span>
              <span id="listcHead">●</span>
              <span id="listcHead">●</span>
            </div>
            <div className="log">
              <span id="listcHead">230630_1240</span>
              <span id="listcHead">
                위험 지대에서 아이의 행동이 감지되었습니다.
              </span>
              <span id="listcHead">●</span>
              <span id="listcHead"></span>
            </div>
            <LOG log={logData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SERVICE;
