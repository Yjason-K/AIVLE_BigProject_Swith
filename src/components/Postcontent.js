import React from "react";
import { Link } from "react-router-dom";

const Postcontent = ({ data }) => {
  const getStringDate = (date) => {
    return new Date(date).toISOString().slice(0, 10);
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

  return data.map((post, idx) => (
    <Link to={`/post/${post.id}`} className="linktopost" key={post.numbers}>
      <div className="noticedescription userPost">
        <span>{idx}</span>
        <span>
          {/* 댓글 개수 보여주는 거 같은디... */}
          {post.title}{" "}
          <div style={{ color: "rgb(60,172,255)", display: "inline" }}>
            {countCommentsByPostId(post.id)}
          </div>
        </span>
        <span>{post.writer}</span>
        <span>{getStringDate(post.postDate)}</span>
        <span>{post.likes}</span>
        <span>{post.views}</span>
      </div>
    </Link>
  ));
};

export default React.memo(Postcontent);


// import React from "react";
// import { Link } from "react-router-dom";

// const Postcontent = ({ data, searchTerm }) => {
//   const getStringDate = (date) => {
//     return new Date(date).toISOString().slice(0, 10);
//   };

//   // 게시물 필터링 로직 추가
//   const filteredData = data.filter((post) =>
//     post.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return filteredData.map((post, idx) => (
//     <Link to={`/post/${post.id}`} className="linktopost" key={post.numbers}>
//       <div className="noticedescription userPost">
//         <span>{idx}</span>
//         <span>
//           {post.title}
//           <div style={{ color: "rgb(60,172,255)", display: "inline" }}>
//             {post.count ? "[" + post.count + "] " : null}
//           </div>
//         </span>
//         <span>{post.writer}</span>
//         <span>{getStringDate(post.postDate)}</span>
//         <span>{post.likes}</span>
//         <span>{post.views}</span>
//       </div>
//     </Link>
//   ));
// };

// export default React.memo(Postcontent);
