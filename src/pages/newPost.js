// newPost
import { useEffect, useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import Myheader from '../components/header';
import { postContext, dataContext } from '../App';

const NMEWPOST = () => {
  // 로그인 검증
  useEffect(() => {
    if (session && session !== 'null') {
      setSessionId(true);
    }
  }, []);

  // 로그인 세션정보
  const session = localStorage.getItem('sessionId');
  const [sessionId, setSessionId] = useState(false);

  // 제목, 본문 내용
  const [postTitle, setPostTitle] = useState('');
  const [content, setContent] = useState('');

  // Ref
  const titleRef = useRef();

  const onChangeContent = (e) => {
    setPostTitle(e.target.value);
  };

  const navigate = useNavigate();

  const originData = localStorage.getItem('posts');
  const data = useContext(dataContext);

  const { onCreate } = useContext(postContext);

  const handleSubmit = () => {
    if (postTitle.length < 4) {
      alert('제목을 입력해주세요');
      titleRef.current.focus();
      return;
    }

    if (content.length < 10) {
      alert('일기를 입력해주세요');
      titleRef.current.focus();
      return;
    }

    if (window.confirm('게시글을 저장하시겠습니까?')) {
      onCreate(postTitle, content);
      navigate('/postlist', { replace: true });
    }
  };

  const handlCancel = () => {
    if (
      window.confirm(
        '게시글 작성을 취소하시겠습니까? 작성된 내용은 내용은 저장되지 않습니다.'
      )
    ) {
      navigate('/postlist', { replace: true });
    }
  };

  // 파일 갯수
  const [att_num, setAttNum] = useState(0);

  const att_plus = () => {
    setAttNum(att_num + 1);
  };
  const att_minus = () => {
    setAttNum(att_num - 1);
  };

  if (att_num > 3) {
    window.alert('이미지는 최대 3개까지 업로드 가능합니다.');
    setAttNum(3);
  }
  if (att_num < 0) {
    setAttNum(0);
  }

  const renderFileInputs = () => {
    const fileInputs = [];
    for (let i = 1; i <= att_num; i++) {
      fileInputs.push(
        <div key={i} className="att_wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, i)}
            className="attach_btn"
          />
          <Button
            variant="secondary"
            className="preview_button"
            onClick={() => handlePreview(i)}
          >
            미리보기
          </Button>
        </div>
      );
    }
    return fileInputs;
  };

  // const renderPreview = () => {
  //   const fileInputs = [];
  //   for (let i = 1; i <= att_num; i++) {
  //     fileInputs
  //       .push(
  //       <Button
  //         key={i}
  //         variant="outline-dark"
  //         className="preview-button"
  //         onClick={() => handlePreview(i)}
  //       >
  //         미리보기
  //       </Button>
  //       );
  //   }
  //   return fileInputs;
  // };

  // 이미지 미리보기를 위한 모달 처리
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handlePreview = (index) => {
    setShowModal(true);
    setSelectedImage(selectedImages[index]);
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImages((prevSelectedImages) => {
          const newSelectedImages = [...prevSelectedImages];
          newSelectedImages[index] = reader.result;
          return newSelectedImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="newpost">
      <Myheader />
      <div className="newPostArea">
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
            <Button
              variant="dark"
              className="postviewbutton_cancel"
              onClick={handlCancel}
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              className="postviewbutton_save"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="newpostcontent">
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: '내용을 입력하세요.',
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
        <div className="attach_area">
          <div className="attach_num">
            <h5
              style={{
                marginRight: 20,
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 14,
                color: 'rgb(41, 41, 41)',
              }}
            >
              이미지 업로드하기
            </h5>
            <Button variant="outline-dark" className="a_btn" onClick={att_plus}>
              +
            </Button>
            <Button
              variant="outline-dark"
              className="a_btn"
              onClick={att_minus}
            >
              -
            </Button>
          </div>
          <div className="file_list">{renderFileInputs()}</div>
        </div>
        {/* <div className="preivew">{renderPreview()}</div> */}
        {/* // newPost 컴포넌트 내에 추가될 코드 */}
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setSelectedImage(null);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: '17px', fontWeight: 'bold' }}>
              이미지 미리보기
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                style={{ width: '100%' }}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="close_btn"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default NMEWPOST;