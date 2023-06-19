//서비스 소개 페이지
import { useEffect, useState } from "react";
import Myheader from "../components/header";

const HOME = () => {
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(false);

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  return (
    <div className="main_page">
      <Myheader isLogin={sessionId} />
      <div>
        <center>
          <br /><br /><br />
          <img src="https://img.freepik.com/free-psd/kindergarten-template-landing-page_23-2148613412.jpg?t=st=1678675138~exp=1678675738~hmac=c33e2148fd46cf82e075048e4c2157476d473043250590d6c4915ce18cc605bc" width="1000px" />
        </center>
      </div>
    </div>
  );
};

export default HOME;