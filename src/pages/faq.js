//FAQ 페이지
import { useEffect, useState } from "react";
import Myheader from "../components/header";

const FAQ = () => {
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(false);

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  return (
    <div className="faq">
      <Myheader isLogin={sessionId} />
      <div>
        <center>
          <br /><br /><br />
          <img src="https://img.freepik.com/premium-vector/faq-page-template-frequently-asked-question-banner-user-support-web-page-question-mark-and-pattern_668430-320.jpg" alt = "사진" width="1000px" />
        </center>
      </div>
    </div>
  );
};

export default FAQ;