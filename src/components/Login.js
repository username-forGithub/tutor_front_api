import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const loginurl = '/login';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = {
      user: { email: user, password: pwd },
    };

    try {
      const response = await axios.post(loginurl,
        JSON.stringify(userInfo),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
      const accessToken = response.headers.authorization;
      const { email, id } = response.data.data;
      const roles = [response.data.data.role];
      localStorage.setItem('token', accessToken);
      setAuth({
        user: email, roles, accessToken, id,
      });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login-page">
      <section className="loginsection">
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
        {/* <h1>Sign In</h1> */}
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="username">
            <input
              type="email"
              id="username"
              ref={emailRef}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <span className="placeholder">Email</span>
            <FontAwesomeIcon icon={faEnvelope} />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <span className="placeholder">Password</span>
            <FontAwesomeIcon icon={faLock} />
          </label>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            {/* put router link here */}
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
