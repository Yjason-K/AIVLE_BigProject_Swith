import React, { useContext, useEffect, useState, useRef } from "react";
import Myheader from "../components/header";
import PostComponent from "../components/Postcontent";
import NumPagination from "./numberpagination";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../App";

const POSTLIST = () => {
  const data = useContext(dataContext);
  const [posts, setPosts] = useState(useContext(dataContext));
  const [isLogin, setIsLogin] = useState(false);
  const [searchBy, setSearchBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // pagination 번호 처리
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

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
      if (window.confirm("로그인 하시겠습니까?")) {
        navigate("/login");
      }
    }
  };

  const navigate = useNavigate();

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      // 검색어가 비어있을 경우 전체 데이터를 설정합니다.
      setPosts(data);
    } else {
      const encodedSearchTerm = encodeURIComponent(searchTerm); // 검색어 인코딩
      if (searchBy === "title") {
        const filteredPosts = data.filter((it) => {
          const encodedTitle = encodeURIComponent(it.title); // 제목 인코딩
          return encodedTitle.includes(encodedSearchTerm);
        });
        setPosts(filteredPosts);
      } else if (searchBy === "writer") {
        const filteredPosts = data.filter((it) => {
          const encodedAuthor = encodeURIComponent(it.writer); // 작성자 인코딩
          return encodedAuthor.includes(encodedSearchTerm);
        });
        setPosts(filteredPosts);
      }
      setCurrentPage(1); // 검색 시 첫 번째 페이지로 설정
    }
  };

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
            <PostComponent
              data={currentPosts(posts)}
              currentPage={currentPage}
            />
            <NumPagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={setCurrentPage}
            />
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
              <button onClick={handleSearch} className="search_btn">
                검색
              </button>
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
