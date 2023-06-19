import React, { useContext, useEffect, useState, useRef } from "react";
import Myheader from "../components/header";
import PostComponent from "../components/Postcontent";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../App";

const POSTLIST = () => {
  const dataId = useRef();
  const data = useContext(dataContext);
  const [isLogin, setIsLogin] = useState(false);
  const [searchBy, setSearchBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sessionId = localStorage.getItem("userId");
    if (sessionId) {
      setIsLogin(true);
    }
  }, []);

  const handleNewPost = () => {
    if (isLogin) {
      navigate("/newpost");
    } else {
      alert("로그인 후 사용할 수 있습니다.");
    }
  };

  const navigate = useNavigate();

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((post) => {
    if (searchBy === "title") {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === "writer") {
      return post.writer.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className="postlist">
      <Myheader isLogin={isLogin} />
      <div className="postlist_wrapper">
        <div className="post_post">
          <div className="freeNotice">
            <div className="pagedesc">게시판</div>
          </div>
          <div className="PostArea">
            <div className="noticedescription">
              <span id="DescHead">번호</span>
              <span id="DescHead">제목</span>
              <span id="DescHead">작성자</span>
              <span id="DescHead">작성일</span>
              <span id="DescHead">추천</span>
              <span id="DescHead">조회수</span>
            </div>
            <PostComponent data={filteredData} />
          </div>
          <div className="btn_area">
            <div className="search_container">
              <select
                value={searchBy}
                onChange={handleSearchByChange}
                style={{ height: 20 }}
              >
                <option value="title">제목</option>
                <option value="writer">작성자</option>
              </select>
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="search_title"
              />
            </div>
            <button className="new_post" onClick={handleNewPost}>
              새글 작성하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSTLIST;

// import React, { useContext, useEffect, useState, useRef } from "react";
// import Myheader from "../components/header";
// import PostComponent from "../components/Postcontent";
// import { useNavigate } from "react-router-dom";
// import { dataContext } from "../App";

// const POSTLIST = () => {
//   const dataId = useRef();
//   const data = useContext(dataContext);
//   const [isLogin, setIsLogin] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const sessionId = localStorage.getItem("userId");
//     if (sessionId) {
//       setIsLogin(true);
//     }
//   }, []);

//   const handleNewPost = () => {
//     if (isLogin) {
//       navigate("/newpost");
//     } else {
//       alert("로그인 후 사용할 수 있습니다.");
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="postlist">
//       <Myheader isLogin={isLogin} />
//       <div className="postlist_wrapper">
//         <div className="post_post">
//           <div className="freeNotice">
//             <div className="pagedesc">게시판</div>
//           </div>
//           <div className="PostArea">
//             <div className="search_bar">
//               <input
//                 type="text"
//                 placeholder="검색어를 입력하세요."
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </div>
//             <div className="noticedescription">
//               <span id="DescHead">번호</span>
//               <span id="DescHead">제목</span>
//               <span id="DescHead">작성자</span>
//               <span id="DescHead">작성일</span>
//               <span id="DescHead">추천</span>
//               <span id="DescHead">조회수</span>
//             </div>
//             <PostComponent data={data} searchTerm={searchTerm} />
//           </div>
//           <div className="btn_area">
//             <button className="new_post" onClick={handleNewPost}>
//               새글 작성하기
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default POSTLIST;
