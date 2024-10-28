import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        {/* Link를 사용한 버전 */}
        <ul className="header-menus">
          <li className="header-menu">
            <Link to="/">홈</Link>
          </li>
          <li className="header-menu">
            <Link to="/contents">콘텐츠</Link>
          </li>
          <li className="header-menu">
            <Link to="/login">로그인</Link>
          </li>
        </ul>

        {/* useNavigate를 사용한 버전 */}
        <ul className="header-menus">
          <li className="header-menu">
            <a onClick={() => navigate('/')}>홈</a>
          </li>
          <li className="header-menu">
            <a onClick={() => navigate('/contents')}>콘텐츠</a>
          </li>
          <li className="header-menu">
            <a onClick={() => navigate('/login')}>로그인</a>
          </li>
        </ul>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
