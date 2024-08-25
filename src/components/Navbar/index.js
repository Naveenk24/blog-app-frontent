import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IoMdAddCircle } from 'react-icons/io';
import './index.css';

const Navbar = () => {
  const navigate = useNavigate();

  const logoutTheUser = () => {
    Cookies.remove('jwt_token');
    return navigate('/login');
  };

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://i.postimg.cc/Gt9YRkS2/logo-Short-Black-3.png"
          alt="nav-logo"
          className="nav-image"
        />
      </Link>
      <div className="nav-elements">
        <Link to="/create" className="link">
          <button className="create-button">Create New Blog</button>
          <IoMdAddCircle className="create-icon" />
        </Link>

        <button className="logout-button" onClick={logoutTheUser}>
          Logut
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
