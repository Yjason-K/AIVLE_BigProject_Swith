import { useEffect, useState } from "react";

const ATTDOWN = (attach) => {
  const [attchData, setAttachData] = useState();
  useEffect(() => {
    setAttachData(att);
  }, []);

  return attchData.map((it) => {
    <div className="download">
      <span>{it.filename}</span>
    </div>;
  });
};

export default ATTDOWN;
