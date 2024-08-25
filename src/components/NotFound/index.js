import { useNavigate } from 'react-router-dom';
import './index.css';

const NotFound = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    return navigate('/');
  };
  return (
    <div className="notfound-container">
      <img
        src="https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg"
        alt="not-found"
        className="not-found-image"
      />
      <p className="not-para">Page Not Found!</p>
      <button className="not-button" onClick={goToHome}>
        Go To Home Page
      </button>
    </div>
  );
};

export default NotFound;
