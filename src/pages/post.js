// post 게시글 확인 페이지
import Myheader from "../components/header";
import { dataContext } from "../App";

import React, { useContext, useEffect, useState, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Commentcontent from "../components/Commentcontent";

function postReducer(state, action) {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter(
        (it) => it.postid !== action.id && it.create_date !== action.date
      );
      break;
    }
    // case "EDIT": {
    //   newState = state.map((it) =>
    //     parseInt(it.id) == parseInt(action.data.id) ? { ...action.data } : it
    //   );
    //   break;
    // }
    default:
      return state;
  }
  localStorage.setItem("comments", JSON.stringify(newState));
  return newState;
}

const POST = () => {
  const [isLogin, setIsLogin] = useState(false);
  const postList = useContext(dataContext);
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [views, setViews] = useState();
  const [likes, setLikes] = useState();
  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [comment, setComment] = useState();

  const { id } = useParams();

  const [commentdata, dispatch] = useReducer(postReducer, []);

  // 댓글 데이터 불러오기
  useEffect(() => {
    const localCommentData = localStorage.getItem("comments");
    if (localCommentData) {
      const comentList = JSON.parse(localCommentData).sort(
        (a, b) => parseInt(b.create_date) - parseInt(a.create_date)
      );
      // 시간순 정렬위해서
      dispatch({ type: "INIT", data: comentList });
    }
  }, []);

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
      setViews(targetPost.views + 1);
      setWriter(targetPost.writer);
      setTitle(targetPost.title);
      setContent(targetPost.content);
    } else {
      // 일기가 없을 때
      alert("없는 게시글 입니다.");
      navigate("/postlist", { replace: true });
    }
  }, [id, postList]);

  const onCreate = () => {
    dispatch({
      type: "CREATE",
      data: {
        postid: id,
        comment_id: JSON.parse(localStorage.getItem("userId")).id,
        comment: comment,
        create_date: new Date().getTime() + 32400000,
      },
    });
    setComment("");
  };

  const onRemove = (targetId, targetDate) => {
    dispatch({
      type: "REMOVE",
      data: {
        id: targetId,
        date: targetDate,
      },
    });
  };

  const createclick = () => {
    if (isLogin) {
      onCreate();
    } else {
      alert("로그인 후 이용가능합니다!");
    }
  };

  return (
    <div className="show_post">
      <Myheader isLogin={isLogin} />
      <div className="post_wrapper">
        <div className="title_wrapper">
          <p>Witten by {writer}</p>
          <p> 제목 : {title}</p>
          <p>
            조회수 : {views}, 추천수 : {likes}
          </p>
        </div>
        <div className="content_wrapper">{ReactHtmlParser(content)}</div>
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
            <button className="coomment_submit" onClick={createclick}>
              등록
            </button>
          </div>
        </div>
        <Commentcontent post_id={id} commentdata={commentdata} />
      </div>
    </div>
  );
};

export default POST;
