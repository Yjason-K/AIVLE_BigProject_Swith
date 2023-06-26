//서비스 페이지
import { useEffect, useState } from "react";
import Myheader from "../components/header";
import "../style/service.css";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="service">
      <Myheader isLogin={sessionId} />
      <div className="container">
        <div className="box livecam">라이브캠</div>
        <div className="verticalContainer">
          <div className="box logContainer">
            <div className="log_record">로그 기록</div>
            <div className="log_number">2</div>
          </div>
          <div className="box service_function">서비스 기능</div>
        </div>
      </div>
    </div>
  );
};

export default SERVICE;
