// post 게시글 확인 페이지
import Myheader from "../components/header";
import { commentContext, dataContext } from "../App";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import Commentcontent from "../components/Commentcontent";
import { postContext } from "../App";
import { Button } from "react-bootstrap";
import axios from "axios";
import ATTDOWN from "../components/attachDown";

const POST = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [post, setPost] = useState();
  const [views, setViews] = useState();
  const [likes, setLikes] = useState();
  const [writer, setWriter] = useState();
  const [loginId, setLoginId] = useState("");
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [comment, setComment] = useState("");
  const [postdate, setPostdate] = useState(null);
  const [commentsData, setCommentData] = useState([]);
  const [targetPost, setTargetPost] = useState({});
  const [attData, setAttData] = useState([]);

  const postList = useContext(dataContext);
  const { onRemove, viewCountUpdate } = useContext(postContext);
  const { commentdata, postonRemove, commentonCreate, commentonRemove } =
    useContext(commentContext);
  const { id } = useParams();

  const [nickname, setNickname] = useState("");

  // axios({
  //   method: "get",
  //   url: `http://15.165.98.14:8080/posts/post/${id}`,
  // })
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((error) => {
  //     console.log("오류가 발생했습니다:", error);
  //   });

  useEffect(() => {
    // 페이지가 로드될 때 실행되는 효과 함수
    const sessionId = localStorage.getItem("token");
    if (sessionId) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://15.165.98.14:8080/posts/post/${id}`,
    })
      .then((res) => {
        setTargetPost(res.data);
        setPost(res.data);
        setLikes(res.data.likeCount);
        setViews(res.data.searchCount); // 여기서 views 값을 증가시킴
        setWriter(res.data.writerDto.nickname);
        setTitle(res.data.title);
        setContent(res.data.content);
        // setPostdate(targetPost.postDate);
        setCommentData(res.data.commentInfoDtoList);
        // console.log(res.data.commentInfoDtoList);
        setAttData(res.data.attachmentInfoDto);
      })
      .catch((err) => {
        alert("잘못된 접근 입니다.");
        navigate("/postlist", { replace: true });
      });

    if (localStorage.getItem("token") !== null) {
      axios({
        method: "get",
        url: `http://15.165.98.14:8080/users/user`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).accessToken
          }`,
        },
      }).then((res) => {
        setLoginId(res.data.nickname);
      });
    }
  }, []);

  // useEffect(() => {
  //   viewCountUpdate(id, title, content, writer, postdate, likes, views);
  // }, [id, title, content, writer, postdate, likes, views]);

  const createclick = () => {
    if (isLogin) {
      if (comment.length !== 0) {
        // commentonCreate(id, comment);
        axios({
          method: "post",
          url: `http://15.165.98.14:8080/comments/${id}`,
          data: {
            content: comment,
          },
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).accessToken
            }`,
          },
        })
          .then(() => {
            // const newComment = {
            //   postId: id,
            //   commentId: commentsData[commentsData.length - 1].postId + 1,
            //   createdDate: new Date(
            //     new Date().getTime() + 32400000
            //   ).toISOString(),
            //   content: comment,
            //   writerDto: {
            //     nickname: loginId,
            //   },
            // };
            setCommentData((preserve) => [
              ...preserve,
              {
                postId: parseInt(id),
                commentId:
                  commentsData === []
                    ? 0
                    : commentsData[commentsData.length - 1].postId + 1,
                createdDate: new Date(
                  new Date().getTime() + 32400000
                ).toISOString(),
                content: comment,
                writerDto: {
                  nickname: loginId,
                },
              },
            ]);
            setComment("");
            // window.location.reload();
          })
          .catch((err) => {
            console.log(err.data);
          });
      } else {
        window.alert("댓글을 입력해주세요.");
      }
    } else {
      alert("로그인 후 이용가능합니다!");
    }
  };

  console.log(loginId);

  const postdeletehandler = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios({
        method: "delete",
        url: `http://15.165.98.14:8080/posts/post/${id}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).accessToken
          }`,
        },
      })
        .then((res) => {
          console.log("게시글이 삭제되었습니다.");
          navigate("/postlist", { replace: true });
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  };

  const editButtonClickHandler = () => {
    if (window.confirm("게시글을 수정하시겠습니까?")) {
      navigate(`/edit/${id}`);
    }
  };

  const title_date = (date) => {
    const title_d =
      new Date(date).toISOString().slice(0, 10) +
      " " +
      new Date(date).toISOString().slice(11, 19);
    return title_d;
  };

  // console.log(JSON.parse(localStorage.getItem("userId")));
  // console.log(writer);
  // console.log(writer === JSON.parse(localStorage.getItem("userId")));
  // console.log(commentsData);
  console.log(commentsData);

  if (writer === loginId) {
    return (
      <div className="show_post">
        <Myheader login={isLogin} />
        <div className="post_wrapper">
          <div className="title_wrapper">
            <div className="post_title">
              <p> {title}</p>
            </div>
            <div className="post_info">
              <p className="writer">{writer}</p>
              <p className="viewcount">
                조회수 : {views}, 추천수 : {likes}
              </p>
              <p className="postdate">
                {postdate !== null && title_date(postdate)}
              </p>
            </div>
          </div>
          <div className="edit_delete">
            <Button
              variant="dark"
              className="btn_delete"
              style={{ marginTop: 5 }}
              onClick={postdeletehandler}
            >
              삭제
            </Button>
            <Button
              variant="dark"
              style={{ marginLeft: 10, marginTop: 5 }}
              onClick={editButtonClickHandler}
              className="btn_edit"
            >
              수정
            </Button>
          </div>
          <div className="content_wrapper">
            <div className="post_content">{parse(String(content))}</div>
          </div>
          <ATTDOWN attach={attData} />
          <div className="comment_section">
            <textarea
              placeholder={
                isLogin
                  ? "인터넷은 우리가 함께 만들어가는 소중한 공간입니다. 댓글 작성 시 타인에 대한 배려와 책임을 담아주세요."
                  : "로그인 후 사용할 수 있습니다."
              }
              maxlength="600"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              style={{ height: 86 }}
              disabled={!isLogin}
            ></textarea>
            <div className="comment_btn">
              <Button
                variant="outline-dark"
                className="to_postlist"
                onClick={() => {
                  navigate("/postlist");
                }}
              >
                목록으로
              </Button>
              <Button
                variant="dark"
                className="coomment_submit"
                onClick={createclick}
              >
                등록
              </Button>
            </div>
          </div>
          <div className="comment_all">
            <Commentcontent
              post_id={id}
              commentdata={commentsData}
              commentonRemove={commentonRemove}
              userId={loginId}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="show_post">
        <Myheader login={isLogin} />
        <div className="post_wrapper">
          <div className="title_wrapper">
            <div className="post_title">
              <p> {title}</p>
            </div>
            <div className="post_info">
              <p className="writer">{writer}</p>
              <p className="viewcount">
                조회수 : {views}, 추천수 : {likes}
              </p>
              <p className="postdate">
                {postdate !== null && title_date(postdate)}
              </p>
            </div>
          </div>
          <div className="content_wrapper">
            <div className="post_content">{parse(String(content))}</div>
          </div>
          <ATTDOWN attach={attData} />
          <div className="comment_section">
            <textarea
              placeholder={
                isLogin
                  ? "인터넷은 우리가 함께 만들어가는 소중한 공간입니다. 댓글 작성 시 타인에 대한 배려와 책임을 담아주세요."
                  : "로그인 후 사용할 수 있습니다."
              }
              maxlength="600"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              style={{ height: 86, backgroundColor: "#F8F8F8" }}
              disabled={!isLogin}
            ></textarea>
            <div className="comment_btn">
              <Button
                variant="outline-dark"
                className="to_postlist"
                onClick={() => {
                  navigate("/postlist");
                }}
              >
                목록으로
              </Button>
              {/* <button>추천</button> */}
              <Button
                variant="dark"
                className="coomment_submit"
                onClick={createclick}
              >
                등록
              </Button>
            </div>
          </div>
          <div className="comment_all">
            <Commentcontent
              post_id={id}
              commentdata={commentsData}
              commentonRemove={commentonRemove}
              userId={loginId}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default POST;
