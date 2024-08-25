import { useDebugValue, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoEyeOffSharp } from 'react-icons/io5';
import { IoEyeSharp } from 'react-icons/io5';
import Cookies from 'js-cookie';

import './index.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const inputType = passwordVisible ? 'text' : 'password';

  const createNewUser = async (e) => {
    e.preventDefault();
    const userDetails = {
      username,
      email,
      password,
      phone,
    };

    try {
      const data = await axios.post('http://localhost:3004/signup', {
        userDetails,
      });

      if (data.status === 201) {
        alert('Registration successfull!');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data);
      } else if (error.request) {
        setErrorMsg('No response from the server. Please try again later.');
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    }
  };

  const onFocusTheInut = () => {
    setErrorMsg('');
  };

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="singup-container">
      <div className="signup-element-container">
        <div className="signup-elements">
          <img
            src="https://i.postimg.cc/Gt9YRkS2/logo-Short-Black-3.png"
            alt="logo"
            className="app-logo"
          />
          <form onSubmit={createNewUser} className="signup-form">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={onFocusTheInut}
              placeholder="Username"
              className="signup-input-email"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={onFocusTheInut}
              placeholder="Email"
              className="signup-input-email"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={onFocusTheInut}
              placeholder="Phone"
              className="signup-input-email"
            />
            <div className="input-password-icon">
              <input
                type={inputType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={onFocusTheInut}
                placeholder="Password"
                className="signup-input-password"
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
            <button type="submit" className="signup-submit-button">
              Login
            </button>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>

          <p className="signup-description">
            Already have an account?
            <Link to="/login" className="login-link">
              <span>Login</span>
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

export default Signup;
