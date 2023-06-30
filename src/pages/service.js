import { useEffect, useState } from "react";
import Myheader from "../components/header";
import "../style/service.css";
import { useNavigate } from "react-router-dom";

const SERVICE = () => {
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(session && session !== "null");
  const [showOverlay, setShowOverlay] = useState(true); // Overlay 상태

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false); // 일정 시간이 지나면 레이어 제거
    }, 10000);

    return () => {
      clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    };
  }, []);

  return (
    <div className="service">
      <Myheader isLogin={sessionId} />
      <div className="container">
        <div className="box livecam" style={{ position: 'relative' }}>
          {showOverlay && 
            <div className="overlay" 
                 style={{ 
                   backgroundColor: 'white', 
                   position: 'absolute', 
                   width: '100%', 
                   height: '100%', 
                   zIndex: 1 
                 }}
            ></div>
          } 
          <div style={{ pointerEvents: "none", zIndex: 0 }}>
            <iframe
              width="880"
              height="495"
              src="https://www.youtube.com/embed/hocye6hLKFo?autoplay=1&mute=1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="verticalContainer">
          {/* <div className="box logContainer">
            <div className="log_record">로그 기록</div>
            <div className="log_number">2</div>
          </div>
          <div className="box service_function">서비스 기능</div> */}
        </div>
      </div>
    </div>
  );
};

export default SERVICE;
