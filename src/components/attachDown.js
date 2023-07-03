import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const ATTDOWN = (attach) => {
  const attchData = attach.attach;

  const [showModals, setShowModals] = useState(
    Array(attchData.length).fill(false)
  );

  const downlink = (fileName, filePath) => {
    const encodedFileName = encodeURIComponent(fileName);
    const encodedFilePath = encodeURIComponent(filePath);

    return `http://15.165.98.14:8080/file/download?uploadFileName=${encodedFileName}&uploadFilePath=${encodedFilePath}`;
  };

  return attchData.map((it, index) => {
    return (
      <div key={it.id}>
        <div className="download">
          <span>{it.originalFileName}</span>
          <Button
            onClick={() => {
              setShowModals((prev) => {
                const updatedModals = [...prev];
                updatedModals[index] = true;
                return updatedModals;
              });
            }}
          >
            미리보기
          </Button>
          <div>
            {console.log(it.originalFileName)}
            <a
              href={downlink(it.uploadFileName, it.uploadFilePath)}
              rel="noopener noreferrer"
              onClick={() => {}}
            >
              <AiOutlineDownload size="30" />
            </a>
          </div>
          <Modal
            show={showModals[index]}
            onHide={() => {
              setShowModals((prev) => {
                const updatedModals = [...prev];
                updatedModals[index] = false;
                return updatedModals;
              });
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ fontSize: "17px", fontWeight: "bold" }}>
                이미지 미리보기
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={it.uploadFileUrl}
                alt="Preview"
                style={{ width: "100%" }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="close_btn"
                variant="secondary"
                onClick={() => {
                  setShowModals((prev) => {
                    const updatedModals = [...prev];
                    updatedModals[index] = false;
                    return updatedModals;
                  });
                }}
              >
                닫기
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  });
};

export default ATTDOWN;

// import { useEffect, useState } from "react";
// import { AiOutlineDownload } from "react-icons/ai";
// import Modal from "react-bootstrap/Modal";
// import { Button } from "react-bootstrap";

// const ATTDOWN = (attach) => {
//   // const [attchData, setAttachData] = useState([]);
//   // useEffect(() => {
//   //   setAttachData(attach);
//   // }, []);

//   // if (attchData && attchData.attach) {
//   //   attchData.attach.map((attachment) => {
//   //     console.log(attachment);
//   //   });
//   // }

//   const attchData = attach.attach;

//   console.log(attchData !== undefined);
//   console.log(attchData);

//   const [showModal, setShowModal] = useState(false);

//   return attchData.map((it) => {
//     return (
//       <div key={it.id}>
//         <div className="download">
//           <span>{it.originalFileName}</span>
//           <Button
//             onClick={() => {
//               setShowModal(true);
//             }}
//           >
//             미리보기
//           </Button>
//           <div className="image-preview">
//             {/* <img
//               src={it.uploadFileUrl}
//               alt={it.originalFileName}
//               width="100"
//               height="100"
//             /> */}
//           </div>
//           <div>
//             <a
//               href={it.uploadFileUrl}
//               download
//               target="_blank" //링크된 문서를 새로운 윈도우나 탭(tab)에서 오픈함.
//               rel="noreferrer"
//             >
//               <AiOutlineDownload size="30" />
//             </a>
//           </div>
//           <Modal
//             show={showModal}
//             onHide={() => {
//               setShowModal(false);
//             }}
//           >
//             <Modal.Header closeButton>
//               <Modal.Title style={{ fontSize: "17px", fontWeight: "bold" }}>
//                 이미지 미리보기
//               </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <img
//                 src={it.uploadFileUrl}
//                 alt="Preview"
//                 style={{ width: "100%" }}
//               />
//             </Modal.Body>
//             <Modal.Footer>
//               <Button
//                 className="close_btn"
//                 variant="secondary"
//                 onClick={() => setShowModal(false)}
//               >
//                 닫기
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </div>
//     );
//   });
// };

// export default ATTDOWN;
