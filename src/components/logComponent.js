import { useEffect, useState } from "react";

const LOG = ({ logData }) => {
  if (logData.length >= 5) {
    return logData.slice(0, 10).map((it) => {
      return (
        <div className="log" key={it.time}>
          {/* 각 요소에 고유한 key 추가 */}
          <span id="listcHead">{it.time}</span>
          <span id="listcHead">{it.log}</span>
          <span id="listcHead" className={it.wifi ? "blink" : ""}>
            ●
          </span>
          <span id="listcHead" className={it.camera ? "blink" : ""}>
            ●
          </span>
        </div>
      );
    });
  } else {
    return logData.map((it) => {
      return (
        <div className="log" key={it.time}>
          {/* 각 요소에 고유한 key 추가 */}
          <span id="listcHead">{it.time}</span>
          <span id="listcHead">{it.log}</span>
          <span id="listcHead" className={it.wifi ? "blink" : ""}>
            ●
          </span>
          <span id="listcHead" className={it.camera ? "blink" : ""}>
            ●
          </span>
        </div>
      );
    });
  }
};

export default LOG;
