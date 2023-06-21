// edit  게시글 수정 페이지

import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import Myheader from "../components/header";
import { postContext, dataContext } from "../App";
import HtmlParser from "react-html-parser";

const POSTEDIT = () => {
  const titleRef = useRef();
  const { id: postid } = useParams;
  const postdata = useContext(dataContext);
  const filterdata = postdata.find((it) => it.id);
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const [views, setViews] = useState();
  const [author, setAuthor] = useState();
  const [like, setLike] = useState();

  useEffect(() => {
    if (filterdata) {
      setPostTitle(filterdata.title);
      setContent(filterdata.content);
      setDate(filterdata.postDate);
      setViews(filterdata.views);
      setAuthor(filterdata.writer);
      setLike(filterdata.likes);
    }
  }, [filterdata]);

  const onChangeContent = (e) => {
    setPostTitle(e.target.value);
  };

  // 비정상적인 접근 차단
  // if (author !== JSON.parse(localStorage.setItem('')))
  return (
    <div className="postedit">
      <Myheader />
      <section className="newPostArea">
        <div className="postController">
          <div className="title_wrapper">
            <span className="publicSection">Title {postTitle.length} / 30</span>
            <input
              className="title-input"
              config={{
                placeholder: `${content}`,
              }}
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
            <button className="postviewbutton">Save</button>
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

export default POSTEDIT;
