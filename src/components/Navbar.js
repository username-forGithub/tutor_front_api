import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// import logo from '../images/logo.svg';
import LogosCanvas from './Logos';

const Navbar = () => {
  let inOut = false;
  const { auth } = useAuth();
  const getTok = localStorage.getItem('token');
  if (auth.accessToken || getTok) {
    inOut = true;
  }
  console.log(auth, ' <----authhh');
  const [lap, setLap] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLap(false);
    }, 3000);
  }, []);
  const ddd = lap ? 'layoutleft' : 'layoutleft deactive';

  return (
    <div className="left">
      <div className={ddd} />
      <div className="logowrapper">
        {/* <div className="logo"><img src={logo} alt="logoimage" /></div> */}
        <div className="logoinnerclass">
          <LogosCanvas />
        </div>
      </div>
      <nav className="item">
        <ul className="ul buttons">
          <li>
            <NavLink className={({ isActive }) => `nav-links${isActive ? ' activated' : ''}`} to="/">All tutors</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => `nav-links${isActive ? ' activated' : ''}`} to="/addtutors">Add tutor</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => `nav-links${isActive ? ' activated' : ''}`} to="/deltutors">Delete tutor</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => `nav-links${isActive ? ' activated' : ''}`} to="/reservedtutors">Myreservations</NavLink>
          </li>
          {
            inOut ? (
              <li>
                <NavLink className={({ isActive }) => `nav-links${isActive ? ' activated' : ''}`} to="/logout">Logout</NavLink>
              </li>
            )
              : (
                <li>
                  <NavLink className={({ isActive }) => `nav-links${isActive ? ' activated' : ''}`} to="/login">Login</NavLink>
                </li>
              )
          }
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
