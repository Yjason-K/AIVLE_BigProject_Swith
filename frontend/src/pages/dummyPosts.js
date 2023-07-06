import React from "react";
import { Link } from "react-router-dom";

const DummyPosts = ({ posts }) => {
  console.log(posts.map((it) => console.log(it.title)));
  return posts.map((post) => (
    <Link to={`/post/${post.id}`} className="linktopost" key={post.numbers}>
      <div className="noticedescription userPost">
        <span>{post.id}</span>
        <span>{post.title}</span>
        <span>{post.author}</span>
        <span>{post.createdate}</span>
        <span>{post.like}</span>
        <span>{post.view}</span>
      </div>
    </Link>
  ));
};

export default DummyPosts;

// import React from "react";
// import { Link } from "react-router-dom";

// const DummyPosts = ({ posts }) => {
//   console.log(posts.map((it) => console.log(it.title)));
//   return posts.map((post) => {
//     <Link to={`/post/${post.id}`} className="linktopost" key={post.numbers}>
//       <div className="noticedescription userPost">
//         <span>{post.id}</span>
//         <span>{post.title}</span>
//         <span>{post.author}</span>
//         <span>{post.createdate}</span>
//         <span>{post.like}</span>
//         <span>{post.view}</span>
//       </div>
//     </Link>;
//   });
// };

// export default DummyPosts;
