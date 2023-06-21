import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const Commentcontent = ({ post_id, commentdata, commentonRemove }) => {
  const getStringDate = (date) => {
    return new Date(date).toISOString().replace("T", " ").split(".")[0];
  };

  const commentfilter = commentdata.filter((it) => it.postid === post_id);

  const today = new Date(new Date().getTime() + 32400000)
    .toISOString()
    .split("T")[0];

  const [loginId, setLoginId] = useState();

  useEffect(() => {
    // 페이지가 로드될 때 실행되는 효과 함수
    const sessionId = localStorage.getItem("userId");
    if (sessionId) {
      setLoginId(JSON.parse(localStorage.getItem("userId")).id);
    }
  }, []);

  const deleteHandler = (id, date) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      commentonRemove(id, date);
    }
  };

  // console.log(
  //   commentfilter.filter(
  //     (it) => it.comment_id !== loginId && it.comment !== "dddddddddd"
  //   )
  // );

  return (
    <>
      {commentfilter.map((it) => (
        <div className="commentlist">
          <div className="first_row">
            <span>{it.comment_id} </span>
            <span>
              {getStringDate(it.create_date).split(" ")[0] === today
                ? getStringDate(it.create_date)
                : getStringDate(it.create_date).split(" ")[0]}
            </span>
          </div>
          <div className="second_row">
            <span style={{ flexGrow: 2, alignItems: "center" }}>
              {it.comment}
            </span>
            {loginId === it.comment_id && (
              <Button
                variant="link"
                onClick={() => deleteHandler(loginId, it.create_date)}
              >
                삭제
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Commentcontent;
