// post 게시글 확인 페이지
import Myheader from "../components/header";
import { commentContext, dataContext } from "../App";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Commentcontent from "../components/Commentcontent";
import { postContext } from "../App";
import { Button } from "react-bootstrap";

const POST = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [post, setPost] = useState();
  const [views, setViews] = useState();
  const [likes, setLikes] = useState();
  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [comment, setComment] = useState("");
  const [postdate, setPostdate] = useState(null);

  const postList = useContext(dataContext);
  const { onRemove, viewCountUpdate } = useContext(postContext);
  const { commentdata, postonRemove, commentonCreate, commentonRemove } =
    useContext(commentContext);
  const { id } = useParams();

  useEffect(() => {
    // 페이지가 로드될 때 실행되는 효과 함수
    const sessionId = localStorage.getItem("userId");
    if (sessionId) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    const targetPost = postList.find((it) => parseInt(it.id) === parseInt(id));
    if (targetPost) {
      //일기가 존재할 때
      setPost(targetPost);
      setLikes(targetPost.likes);
      setViews(targetPost.views + 1); // 여기서 views 값을 증가시킴
      setWriter(targetPost.writer);
      setTitle(targetPost.title);
      setContent(targetPost.content);
      setPostdate(targetPost.postDate);
      viewCountUpdate(
        id,
        title,
        content,
        writer,
        postdate,
        likes,
        targetPost.views + 1
      ); // 변경된 views 값을 전달
    } else {
      // 일기가 없을 때
      alert("잘못된 접근 입니다.");
      navigate("/postlist", { replace: true });
    }
  }, []);

  useEffect(() => {
    viewCountUpdate(id, title, content, writer, postdate, likes, views);
  }, [id, title, content, writer, postdate, likes, views]);

  const createclick = () => {
    if (isLogin) {
      if (comment.length !== 0) {
        commentonCreate(id, comment);
        setComment("");
      } else {
        window.alert("댓글을 입력해주세요.");
      }
    } else {
      alert("로그인 후 이용가능합니다!");
    }
  };

  const postdeletehandler = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      onRemove(id);
      postonRemove(id);
      navigate("/postlist", { replace: true });
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

  console.log(postdate);

  if (writer === JSON.parse(localStorage.getItem("userId"))?.id) {
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
            <div className="post_content">{ReactHtmlParser(content)}</div>
          </div>
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
              commentdata={commentdata}
              commentonRemove={commentonRemove}
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
            <div className="post_content">{ReactHtmlParser(content)}</div>
          </div>
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
              commentdata={commentdata}
              commentonRemove={commentonRemove}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default POST;
