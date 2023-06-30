import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./myheader.scss";
import logo from "../img/logo.png";

const Myheader = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('token');
    if (userId) {
      setIsLogin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    navigate('/main', { repalce: true });
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
            {userId && (
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
            {userId ? (
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