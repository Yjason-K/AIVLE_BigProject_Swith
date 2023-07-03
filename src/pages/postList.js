import React, { useContext, useEffect, useState } from "react";
import Myheader from "../components/header";
import PostComponent from "../components/Postcontent";
import NumPagination from "./numberpagination";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../App";
import Button from "react-bootstrap/Button";
import axios from "axios";

const POSTLIST = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  // const data = useContext(dataContext);

  const [posts, setPosts] = useState(useContext(dataContext));
  const [isLogin, setIsLogin] = useState(false);

  // 검색을 위한 변수 설정
  const [searchBy, setSearchBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Pagination을 위한 정보 가져오기
  useEffect(() => {
    axios({
      method: "get",
      url: "http://15.165.98.14:8080/posts/pageNumber",
    })
      .then((res) => {
        setTotalPosts(res.data.totalElements);
        setTotalPages(res.data.totalPages);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, []);

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `http://15.165.98.14:8080/posts/postList?page=${currentPage}`,
  //   })
  //     .then((res) => {
  //       setData(res.data.content);
  //     })
  //     .catch((err) => {
  //       console.log(err.data);
  //     });
  // });

  // pagination 번호 처리
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  // 로그인 했는지 확인
  useEffect(() => {
    const sessionId = localStorage.getItem("token");
    if (sessionId) {
      setIsLogin(true);
    }
  }, []);

  // 새글 작성 (로그인 확인)
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

  // 검색 조건이랑 검색 단어 변수 변경
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색을 실행할때 - 빈 검색어 임력시 전체 데이터 불러오기
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
      <Myheader />
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
            <PostComponent currentPage={currentPage} />
            <NumPagination paginate={setCurrentPage} totalPages={totalPages} />
          </div>
          <div className="btn_area">
            <div className="search_container">
              <select
                value={searchBy}
                onChange={handleSearchByChange}
                style={{ height: 22.5, fontSize: "11px", borderRadius: "5px" }}
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
              <Button
                variant="outline-dark"
                onClick={handleSearch}
                className="search_btn"
              >
                검색
              </Button>
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
