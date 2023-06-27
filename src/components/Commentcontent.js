import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const Commentcontent = ({ post_id, commentdata, commentonRemove }) => {
  const getStringDate = (date) => {
    return new Date(date).toISOString().replace('T', ' ').split('.')[0];
  };

  const commentfilter = commentdata.filter((it) => it.postid === post_id);

  const today = new Date(new Date().getTime() + 32400000)
    .toISOString()
    .split('T')[0];

  const [loginId, setLoginId] = useState();

  useEffect(() => {
    // 페이지가 로드될 때 실행되는 효과 함수
    const sessionId = localStorage.getItem('userId');
    if (sessionId) {
      setLoginId(JSON.parse(localStorage.getItem('userId')).id);
    }
  }, []);

  const deleteHandler = (id, date) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
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
            <span className="comment_id">{it.comment_id} </span>
            <span className="comment_date">
              {getStringDate(it.create_date).split(' ')[0] === today
                ? getStringDate(it.create_date)
                : getStringDate(it.create_date).split(' ')[0]}
            </span>
          </div>
          <div className="second_row">
            <span
              style={{ flexGrow: 2, alignItems: 'center', fontSize: '12px' }}
            >
              {it.comment}
            </span>
            {loginId === it.comment_id && (
              <Button
                variant="link"
                onClick={() => deleteHandler(loginId, it.create_date)}
                className="commment_delete_button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-trash"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Commentcontent;
