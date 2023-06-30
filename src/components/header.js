import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './myheader.scss';
import logo from '../img/logo.png';

const Myheader = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => {
      setUserId(localStorage.getItem("userId"));
    };
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("storage", handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
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
            <li>
              {location.pathname === '/service' ? (
                <span style={{cursor: "pointer"}}>Service</span>
              ) : (
                <Link to="/service">
                  <span>Service</span>
                </Link>
              )}
            </li>
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
