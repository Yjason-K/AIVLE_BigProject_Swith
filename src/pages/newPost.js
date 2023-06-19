// newPost
import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Myheader from "../components/header";
import { postContext, dataContext } from "../App";

const NMEWPOST = () => {
  // 로그인 검증
  useEffect(() => {
    if (session && session !== "null") {
      setSessionId(true);
    }
  }, []);

  // 로그인 세션정보
  const session = localStorage.getItem("sessionId");
  const [sessionId, setSessionId] = useState(false);

  // 제목, 본문 내용
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");

  // Ref
  const titleRef = useRef();

  const onChangeContent = (e) => {
    setPostTitle(e.target.value);
  };

  const navigate = useNavigate();

  const originData = localStorage.getItem("posts");
  const data = useContext(dataContext);

  const onCreate = useContext(postContext);

  const handleSubmit = () => {
    if (postTitle.length < 4) {
      alert("제목을 입력해주세요");
      titleRef.current.focus();
      return;
    }

    if (content.length < 10) {
      alert("일기를 입력해주세요");
      titleRef.current.focus();
      return;
    }

    if (window.confirm("게시글을 저장하시겠습니까?")) {
      onCreate(postTitle, content);
      navigate("/postlist", { replace: true });
    }
  };

  return (
    <div className="newpost">
      <Myheader />
      <section className="newPostArea">
        <div className="postController">
          <div className="title_wrapper">
            <span className="publicSection">Title {postTitle.length} / 30</span>
            <input
              className="title-input"
              type="text"
              maxLength={30}
              placeholder="제목을 입력해주세요"
              value={postTitle}
              onChange={onChangeContent}
              name="title"
              style={{ width: 200 }}
              ref={titleRef}
            />
          </div>
          <div className="newpost_btn_wrapper">
            <Link to={"/postlist"} className="linkButtondesign">
              <button className="postviewbutton_cancel">Cancel</button>
            </Link>
            <button className="postviewbutton" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
        <div className="newpostcontent">
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "내용을 입력하세요.",
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ editor, data });
              setContent(data);
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default NMEWPOST;
