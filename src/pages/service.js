import { useEffect, useState } from "react";
import Myheader from "../components/header";
import "../style/service.css";
import { useNavigate } from "react-router-dom";
import LOG from "../components/logComponent";
import favicon from "../img/favicon.png";

const SERVICE = () => {
  const session = localStorage.getItem("token");
  const navigate = useNavigate();

  // 세션 체크
  if (!session || session === "null") {
    navigate("/main", { replace: true });
  }

  const [logData, setLogData] = useState([]);
  // const [detection, setDetection] = useState("로그가 뜨면 이곳에 보여집니다."); // 3초 보여줄곳

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // const [serial, setSerial] = useState();
  // token을 통한 유저 정보 가져올때
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

  useEffect(() => {
    const eventSource = new EventSource(
      `http://15.165.98.14:8080/notifications/subscribe/123456`
    );

    eventSource.onopen = () => {
      console.log("서번연결 성공");
      console.log(eventSource.readyState);
    };

    eventSource.onmessage = (e) => {
      console.log("Data get!");
      console.log(e);
      const res = e.data;
      console.log(res);
      const parsedData = JSON.parse(res);
      console.log(parsedData);
      // setLogData((prevLogData) => [...prevLogData, parsedData]);

      // 받아오는 data로 할 일
    };
    eventSource.addEventListener(
      "sse",
      function (e) {
        // console.log("Data get!");
        // console.log(e);
        const res = e.data;
        if (res !== "EventStream Created. [userId=123456]") {
          // ...
          const jsonres = JSON.parse(res);

          const now = new Date().getTime() + 32400000;
          const logTime = new Date(parseInt(now))
            .toISOString()
            .replace("T", " ")
            .split(".")[0]
            .slice(2, 19);

          if (jsonres !== "EventStream Created. [userId=123456]") {
            const parseD = jsonres;
            parseD.time = logTime;
            console.log(parseD);
            const a = parseD.log;

            // setDetection(a);
            // setTimeout(() => {
            //   setDetection("");
            // }, 3000);
            setLogData((prevLogData) => [parseD, ...prevLogData]);
            if (Notification.permission === "granted") {
              const notification = new Notification(
                "위험행동이 감지되었습니다..",
                {
                  body: a,
                  icon: favicon,
                }
              );
            }
          }

          // console.log(logData);
        }
      },
      false
    );

    eventSource.onerror = (e) => {
      // 종료 또는 에러 발생 시 할 일
      eventSource.close();

      if (e.error) {
        // 에러 발생 시 할 일
        console.log("연결 실패!!", eventSource.readyState);
      }

      if (e.target.readyState === EventSource.CLOSED) {
        console.log("SSE가 종료되었습니다"); // 종료 시 할 일
      }
    };
    return () => {
      eventSource.close(); // EventSource 연결 종료
    };
  }, []);

  console.log(logData);
  return (
    <div className="service">
      <Myheader isLogin={session} />
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* <span className="log_detection">{detection}</span> */}
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
              <span id="listcHead">23-06-29 16:29:01</span>
              <span id="listcHead">아이 낙상이 감지되었습니다.</span>
              <span id="listcHead">●</span>
              <span id="listcHead">●</span>
            </div>
            <div className="log">
              <span id="listcHead">23-06-29 16:29:02</span>
              <span id="listcHead">아이의 뒤집힘이 감지되었습니다.</span>
              <span id="listcHead">●</span>
              <span id="listcHead">●</span>
            </div>
            <div className="log">
              <span id="listcHead">23-06-29 16:29:03</span>
              <span id="listcHead">
                위험 지대에서 아이의 행동이 감지되었습니다.
              </span>
              <span id="listcHead">●</span>
              <span id="listcHead"></span>
            </div>
            <LOG logData={logData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SERVICE;
