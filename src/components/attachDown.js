import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

const ATTDOWN = (attach) => {
  const [attchData, setAttachData] = useState();
  useEffect(() => {
    setAttachData(att);
  }, []);

  const [showModal, setShowModal] = useState(false);

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
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "17px", fontWeight: "bold" }}>
            이미지 미리보기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={it.imageLink} alt="Preview" style={{ width: "100%" }} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="close_btn"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>;
  });
};

export default ATTDOWN;
