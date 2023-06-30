import { useState } from "react";
import Myheader from "../components/header";
import "../style/service.css";
import { useNavigate } from "react-router-dom";
import LOG from "../components/logComponent";
import EventSource from "eventsource";

const SERVICE = () => {
  const session = localStorage.getItem("token");
  const [sessionId, setSessionId] = useState(false);
  const navigate = useNavigate();

  // 세션 체크
  if (!session || session === "null") {
    navigate("/main", { replace: true });
  }

  const [logData, setLogData] = useState([]);
  const [detection, setDetection] = useState();

  // axios({
  //   method: "get",
  //   url: "http://15.165.98.14:8080/???",
  //   headers: {
  //     Authorization: `Bearer ${
  //       JSON.parse(localStorage.getItem("token")).accessToken
  //     }`,
  //   },
  // }).then((res) => {
  //   setLogData(res.data)
  //   setDetection(res.data.detection)
  //   setTimeout(() => {
  //   setDetection("");
  //   }, 3000);
  // }).catch((err) => {
  //   console.log("로그를 가져오지 못했습니다.", err)
  // });

  const [serial, setSerial] = useState();

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `http://15.165.98.14:8080/users/user`,
  //     headers: {
  //       Authorization: `Bearer ${
  //         JSON.parse(localStorage.getItem("token")).accessToken
  //       }`,
  //     },
  //   }).then((res) => {
  //     setSerial(res.data.serialNumber);
  //   });
  // }, [serial]);

  const fetchSSE = () => {
    const eventSource = new EventSource(
      `http://15.165.98.14:8080/notifications/subscribe/123456`
    );

    eventSource.onopen = () => {
      console.log("서번연결 성공");
      console.log(eventSource.readyState);
    };

    eventSource.onmessage = async (e) => {
      const res = await e.data;
      const parsedData = JSON.parse(res);
      setLogData([...logData, parsedData]);

      // 받아오는 data로 할 일
    };

    eventSource.onerror = (e) => {
      // 종료 또는 에러 발생 시 할 일
      eventSource.close();

      if (e.error) {
        // 에러 발생 시 할 일
        console.log(eventSource.readyState);
      }

      if (e.target.readyState === EventSource.CLOSED) {
        // 종료 시 할 일
      }
    };
  };

  fetchSSE();

  return (
    <div className="service">
      <Myheader isLogin={session} />
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
