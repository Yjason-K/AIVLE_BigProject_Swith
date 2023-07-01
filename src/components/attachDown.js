import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

const ATTDOWN = (attach) => {
  const [attchData, setAttachData] = useState();
  useEffect(() => {
    setAttachData(att);
  }, []);

  return attchData.map((it) => {
    <div className="download">
      <span>{it.filename}</span>
      <div className="image-preview">
        <img src={it.imageLink} alt={it.filename} width="100" height="100" />
      </div>
      <div>
        <a
          href={it.imageLink}
          download
          target="_blank" //링크된 문서를 새로운 윈도우나 탭(tab)에서 오픈함.
          rel="noreferrer"
        >
          <AiOutlineDownload size="30" />
        </a>
      </div>
    </div>;
  });
};

export default ATTDOWN;
