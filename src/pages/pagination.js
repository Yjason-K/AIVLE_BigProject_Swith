import React, { useContext, useEffect, useState, useRef } from "react";
import Myheader from "../components/header";
import generateDummyData from "./dummyData";
import { useNavigate } from "react-router-dom";
import DummyPosts from "./dummyPosts";
import NumPagination from "./numberpagination";
import dummyData from "./dummyData";

const Pagination = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [posts, setPosts] = useState(generateDummyData);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchBy, setSearchBy] = useState("title"); // 분류 탭
  const [searchTerm, setSearchTerm] = useState("");

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

  // pagination 번호 처리
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      // 검색어가 비어있을 경우 dummyData를 설정합니다.
      setPosts(dummyData);
    } else {
      const encodedSearchTerm = encodeURIComponent(searchTerm); // 검색어 인코딩
      if (searchBy === "title") {
        const filteredPosts = dummyData.filter((it) => {
          const encodedTitle = encodeURIComponent(it.title); // 제목 인코딩
          return encodedTitle.includes(encodedSearchTerm);
        });
        setPosts(filteredPosts);
      } else if (searchBy === "writer") {
        const filteredPosts = dummyData.filter((it) => {
          const encodedAuthor = encodeURIComponent(it.author); // 작성자 인코딩
          return encodedAuthor.includes(encodedSearchTerm);
        });
        setPosts(filteredPosts);
        setCurrentPage(1);
      }
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
            <DummyPosts
              posts={currentPosts(posts)}
              loading={loading}
            ></DummyPosts>
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
              <button
                style={{ paddingTop: 1, paddingBottom: 1 }}
                onClick={handleSearch}
              >
                검색
              </button>
            </div>
            {isLogin && (
              <button className="new_post" onClick={handleNewPost}>
                새글 작성하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
