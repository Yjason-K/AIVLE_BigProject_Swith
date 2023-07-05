// edit  게시글 수정 페이지

import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Myheader from "../components/header";
import { postContext, dataContext } from "../App";
import { Button } from "react-bootstrap";
import axios from "axios";

const POSTEDIT = () => {
  const titleRef = useRef();
  const { id: postid } = useParams();
  const postdata = useContext(dataContext);
  const { onEdit } = useContext(postContext);
  const filterdata = postdata.find((it) => it.id);
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const [views, setViews] = useState();
  const [author, setAuthor] = useState();
  const [like, setLike] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://15.165.98.14:8080/posts/post/${postid}`,
    })
      .then((res) => {
        setPostTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        alert("게시글을 불러오지 못했습니다..");
        navigate("/postlist", { replace: true });
      });
  }, []);

  const onChangeContent = (e) => {
    setPostTitle(e.target.value);
  };

  const navigate = useNavigate();

  const saveHandler = () => {
    if (postTitle.length < 4) {
      alert("제목을 입력해주세요(4글자 이상)");
      titleRef.current.focus();
      return;
    }

    if (content.length < 10) {
      alert("내용을 10글자 이상 입력해주세요");
      titleRef.current.focus();
      return;
    }

    if (window.confirm("수정한 게시글을 저장시겠습니까?")) {
      onEdit(postid, postTitle, content, author, date, like, views);
      navigate("/postlist", { replace: true });
    }

    axios({
      method: "put",
      url: `http://15.165.98.14:8080/posts/edit/${postid}`,
      data: {
        title: postTitle,
        content: content,
      },
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).accessToken
        }`,
      },
    })
      .then((res) => {
        navigate("/postlist", { replace: true });
      })
      .catch((err) => {
        console.log("게시글을 수정하지 못했습니다.", err.data);
      });
  };

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
              placeholder="제목을 입력해주세요(4글자 이상)"
              value={postTitle}
              onChange={onChangeContent}
              name="title"
              style={{ width: 200 }}
              ref={titleRef}
            />
          </div>
        </div>
        <div className="newpostcontent">
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "내용을 입력하세요(3글자 이상)",
            }}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ editor, data });
              setContent(data);
            }}
          />
        </div>
        <div style={{ marginTop: "100px" }}>
          <div
            className="newpost_btn_wrapper"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link to={"/postlist"} className="linkButtondesign">
              <Button
                variant="dark"
                className="postviewbutton_save"
                style={{
                  marginLeft: "2px",
                  width: "100%",
                  height: "30px",
                  fontSize: "15px",
                }}
                onClick={() => {
                  if (window.confirm("게시글 수정을 취소하시겠습니까?")) {
                    navigate("/postlist", { replace: true });
                  }
                }}
              >
                Cancel
              </Button>
            </Link>
            <Button
              variant="dark"
              className="postviewbutton_save"
              style={{ width: "10%", marginRight: "0px", fontSize: "15px" }}
              onClick={saveHandler}
            >
              Save
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default POSTEDIT;
