import { Fragment, useEffect, useState } from "react";

const LOG = (log) => {
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    setLogData([...logData, log]);
  }, [log]);

  console.log(logData);

  return logData.map((it) => {
    <div className="log">
      <span id="listcHead">{it.creatTime}</span>
      <span id="listcHead">{it.detection}</span>
      <span id="listcHead">{it.wifi ? "●" : ""}</span>
      <span id="listcHead">{it.cam ? "●" : ""}</span>
    </div>;
  });
};

export default LOG;