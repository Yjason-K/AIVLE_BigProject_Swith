import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./myheader.scss";
import logo from "../img/logo.png";

const Myheader = () => {
  const initialLoginState = Boolean(localStorage.getItem('token'));
  const [isLogin, setIsLogin] = useState(initialLoginState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => {
      const token = localStorage.getItem('token');
      setIsLogin(Boolean(token));
    };

    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('storage', handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    navigate('/main', { replace: true });
  };

  return (
    <div className="navigation">
      <div className="nav-container">
        <div className="brand">
          <Link to="/main">
            <img src={logo} style={{ width: '100px' }} alt="service_logo" />
          </Link>
        </div>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/main">
                <span>Home</span>
              </Link>
            </li>
            {isLogin && (
              <li>
                {location.pathname === '/service' ? (
                  <span style={{cursor: "pointer"}}>Service</span>
                ) : (
                  <Link to="/service">
                    <span>Service</span>
                  </Link>
                )}
              </li>
            )}
            <li>
              <Link to="/team21">
                <span>Team</span>
              </Link>
            </li>
            <li>
              <Link to="/postlist">
                <span>Post</span>
              </Link>
            </li>
            <li>
              <Link to="/faq">
                <span>FAQ</span>
              </Link>
            </li>
            {isLogin ? (
              <>
                <li>
                  <Link to="/mypage">
                    <span>Mypage</span>
                  </Link>
                </li>
                <li>
                  <Link to="/main" onClick={handleLogout}>
                    <span>Logout</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <span>Sign Up</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Myheader;