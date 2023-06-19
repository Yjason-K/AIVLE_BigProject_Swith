import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import HOME from "./pages/home";
import NEWPOST from "./pages/newPost";
import POSTEDIT from "./pages/postedit";
import POST from "./pages/post";
import POSTLIST from "./pages/postList";
import FAQ from "./pages/faq";
import AIVLE from "./pages/aivle";
import MYPAGE from "./pages/mypage";
import LOGIN from "./pages/login";
import SIGNUP from "./pages/singup";
import SERVICE from "./pages/service";
import FindID from "./pages/findid";

import "./App.css";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

function postReducer(state, action) {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        parseInt(it.id) == parseInt(action.data.id) ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("posts", JSON.stringify(newState));
  return newState;
}

export const postContext = createContext();
export const dataContext = createContext();

function App() {
  // 게시글 Id numnber 지정
  // 서버에서 받아오는거 보고 id지정 어떻게 받아올지 결정
  const [dataId, setDataId] = useState(
    !localStorage.getItem("posts")
      ? 0
      : JSON.parse(localStorage.getItem("posts"))[0].id + 1
  );

  // const [session, setSession] = useState(
  //   JSON.parse(localStorage.getItem("userId"))
  // );
  const [isLogin, setIsLogin] = useState(false);
  const [data, dispatch] = useReducer(postReducer, []);

  // 로컬에 저장된 데이터 불러오기
  useEffect(() => {
    const localData = localStorage.getItem("posts");
    if (localData) {
      const postsList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      // 시간순 정렬위해서
      dispatch({ type: "INIT", data: postsList });
    }
  }, []);

  // CREATE
  const onCreate = (title, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId,
        title,
        content,
        writer: JSON.parse(localStorage.getItem("userId")).id, //로그인 정보 받아서 닉네임이랑 연결 예정
        postDate: new Date().getTime() + 32400000,
        likes: 0,
        views: 0,
      },
    });
    setDataId(dataId + 1);
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime() + 32400000,
        content,
      },
    });
  };

  return (
    <postContext.Provider value={onCreate}>
      <dataContext.Provider value={data}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/main" replace />} />
              <Route path="/main" element={<HOME />} />
              <Route path="/newpost" element={<NEWPOST />} />
              <Route path="/edit" element={<POSTEDIT />} />
              <Route path="/post/:id" element={<POST />} />
              <Route path="/postlist" element={<POSTLIST />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/team21" element={<AIVLE />} />
              <Route path="/mypage" element={<MYPAGE />} />
              <Route path="/login" element={<LOGIN />} />
              <Route path="/signup" element={<SIGNUP />} />
              <Route path="/findid" element={<FindID />} />
              <Route path="/service" element={<SERVICE />} />
            </Routes>
          </div>
        </BrowserRouter>
      </dataContext.Provider>
    </postContext.Provider>
  );
}

export default App;
