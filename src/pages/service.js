//서비스 페이지
import { useEffect, useState } from "react";
import Myheader from "../components/header";

const SERVICE = () => {
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(false);

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  return (
    <div className="service">
      <Myheader isLogin={sessionId} />
      <div>
        <center>
          <br /><br /><br />
          <img src="https://imgscf.slidemembers.com/docs/1/1/354/service_introduction_page_template_353420.jpg" alt = "사진" width="1000px" />
        </center>
      </div>
    </div>
  );
};

export default SERVICE;