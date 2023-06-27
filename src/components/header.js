import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './myheader.scss';
import logo from '../img/logo.png';

const Myheader = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLogin(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLogin(false);
    navigate('/main', { repalce: true });
  };

  if (isLogin) {
    return (
      <div className="navigation">
        <div className="nav-container">
          <div className="brand">
            <Link to="/main">
              <img src={logo} style={{ width: '130px' }} alt="service_logo" />
            </Link>
          </div>
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/service">
                  <span>Service</span>
                </Link>
              </li>
              <li>
                <Link to="/main">
                  <span>Home</span>
                </Link>
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
              <li>
                <Link to="/mypage">
                  <span>Mypage</span>
                </Link>
              </li>
              <li>
                <Link to="/main">
                  <span onClick={handleLogout}>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navigation">
        <div className="nav-container">
          <div className="brand">
            <Link to="/main">
              <img src={logo} style={{ width: '100px' }} alt="serive_logo" />
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
            </ul>
          </nav>
        </div>
      </div>
    );
  }
};

export default Myheader;
