import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Postcontent = ({ currentPage }) => {
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://15.165.98.14:8080/posts/postList?page=${currentPage - 1}`,
    })
      .then((res) => {
        setPageData(res.data.content);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [currentPage]);

  const getStringDate = (date) => {
    return date.slice(0, 10);
  };

  function countCommentsByPostId(id) {
    const comments = JSON.parse(localStorage.getItem("comments"));
    if (!comments) {
      return 0; // 댓글 데이터가 없는 경우 0을 반환
    }

    const matchingComments = comments.filter(
      (comment) => parseInt(comment.postid) === parseInt(id)
    );
    return matchingComments.length;
  }

  // 게시글 번호처리를 위한 array
  let a = [];
  for (let i = 1; i <= 10; i++) {
    a.push((currentPage - 1) * 2 + i);
  }

  return pageData.map((post, idx) => (
    <Link to={`/post/${post.postId}`} className="linktopost" key={post.numbers}>
      <div className="noticedescription userPost">
        <span>{a[idx]}</span>
        <span>
          {/* 댓글 개수 보여주는 거 같은디... */}
          {post.title}{" "}
          <div style={{ color: "rgb(60,172,255)", display: "inline" }}>
            {/* {post.commentInfoDtoList.length} */}0
          </div>
        </span>
        <span>{post.writer}</span>
        <span>{getStringDate(post.createTime)}</span>
        <span>{post.likeCount}</span>
        <span>{post.searchCount}</span>
      </div>
    </Link>
  ));
};

export default React.memo(Postcontent);
