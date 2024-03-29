/* eslint-disable */
import { useRef, useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_@.]{6,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%-_]).{8,24}$/;
// const PWD_REGEX = /^(?=.*[a-z]).{1,24}$/;
const signupurl = '/signup';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const pasOnblur = ()=> {
    if (pwd.length != 0) {
      setPwdFocus(true)
      console.log(pwdFocus, "pwdFocus");
    } else {
      setPwdFocus(false)
    }
  }

  const conOnblur = ()=> {
    if (matchPwd.length != 0) {
      setMatchFocus(true)
      console.log(pwdFocus, "pwdFocus");
    } else {
      setMatchFocus(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enablednbn with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }

    const userInfo = {
      user: { email: user, password: pwd },
    };

    try {
      await axios.post(signupurl,
        JSON.stringify(userInfo),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        });
      setSuccess(true);
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err?.response?.data.status.code === 426) {
        setErrMsg(err?.response?.data.status.message);
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="register-page">
      {success ? (
        <Navigate to="/login" />
      ) : (
        <section className="registersection">
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
          {/* <h1>Register</h1> */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">       
            
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <div className="placeholderwrapper">
                <span className="placeholder">Email</span>
                <span>
                  <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validName || !user ? 'hide' : 'invalid'} />
                </span>
              </div>
            </label>
            <p id="uidnote" className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label className = {pwdFocus ? "yes" : "" } htmlFor="password">
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={pasOnblur}
              />
              <div className="placeholderwrapper">
                <span className="placeholder">Password</span>
                <span>
                  <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
                </span>
              </div>
            </label>
            <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a special character.
              <br />
              Allowed special characters:
              {' '}
              <span aria-label="exclamation mark">!</span>
              {' '}
              <span aria-label="at symbol">@</span>
              {' '}
              <span aria-label="hashtag">#</span>
              {' '}
              <span aria-label="dollar sign">$</span>
              {' '}
              <span aria-label="percent">%</span>
            </p>

            <label className = {matchFocus ? "yes" : "" } htmlFor="confirm_pwd">
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={conOnblur}
            />
            <div className="placeholderwrapper">
                <span className="placeholder">Confirm Password</span>
                <span>
                  <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
                </span>
              </div>
            </label>
            <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button type="submit" disabled={!!(!validName || !validPwd || !validMatch)}>Sign Up</button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/* put router link here */}
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Register;
