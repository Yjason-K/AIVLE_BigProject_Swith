//팀 소개 페이지
import { useEffect, useState } from "react";
import Myheader from "../components/header";

const AIVLE = () => {
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(false);

  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  return (
    <div className="aivle">
      <Myheader isLogin={sessionId} />
      <div>
        <center>
          <br /><br /><br />
          <img src="https://imgscf.slidemembers.com/docs/1/1/426/pitch_team_team_introduction_ppt_deck_425777.jpg" width="1000px" />
        </center>
      </div>
    </div>
  );
};

export default AIVLE;