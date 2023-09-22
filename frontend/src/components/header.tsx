import { useRecoilState } from "recoil";
import logo from "../assets/imgs/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { loginState } from "../libs/atoms/state";
import "../styles/components/header.css";

const HEADER = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <div className="header">
      <div className="logo_container">
        <button className="logo_button" onClick={() => navigate("/main")}>
          <img src={logo} alt="swith_logo" className="swith_logo" />
        </button>
      </div>
      <nav
        id="menu"
        role="navigation"
        aria-label="Main Navigation"
        className="main_nav"
      >
        <ul>
          <li>
            <Link to="/main">HOME</Link>
          </li>
          <li>
            <Link to="/team21">Team</Link>
          </li>
          <li>
            <Link to="/postlist">Post</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          {isLogin ? (
            <li>
              <Link to="/main" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLogin ? (
            <li>
              <Link to="/singup">Sign Up</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default HEADER;
