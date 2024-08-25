import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IoEyeOffSharp } from 'react-icons/io5';
import { IoEyeSharp } from 'react-icons/io5';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const inputType = passwordVisible ? 'text' : 'password';

  const submitUserLogin = async (e) => {
    e.preventDefault();
    const userDetails = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:3004/login', {
        userDetails,
      });

      if (response.status === 200) {
        Cookies.set('jwt_token', response.data.jwtToken, { expires: 2 }); //response.data.jwtToken;
        alert('Login Successfully!');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMsg(error.response.data); // Set error message from server
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.'); // Handle other errors
      }
    }
  };

  const onFocusTheLoginInput = () => {
    setErrorMsg('');
  };

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-element-container">
        <div className="login-elements">
          <img
            src="https://i.postimg.cc/Gt9YRkS2/logo-Short-Black-3.png"
            alt="logo"
            className="app-logo"
          />
          <form onSubmit={submitUserLogin} className="login-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={onFocusTheLoginInput}
              placeholder="Email"
              className="login-input-email"
            />
            <div className="input-password-icon">
              <input
                type={inputType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={onFocusTheLoginInput}
                placeholder="Password"
                className="login-input-password"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prevState) => !prevState)}
                className="password-icon-button"
              >
                {passwordVisible ? (
                  <IoEyeOffSharp className="password-icon" />
                ) : (
                  <IoEyeSharp className="password-icon" />
                )}
              </button>
            </div>
            <button type="submit" className="login-submit-button">
              Login
            </button>
            {errorMsg.length !== 0 && <p className="error-msg">{errorMsg}</p>}
          </form>

          <p className="login-description">
            Don't have an account?
            <Link to="/signup" className="signup-link">
              <span>Signup</span>
            </Link>
          </p>
        </div>
      </div>

      <div className="login-image-container">
        <img
          src="https://i.postimg.cc/SR59xJwG/sign-Up-Right-3.png"
          alt="logo"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default Login;
