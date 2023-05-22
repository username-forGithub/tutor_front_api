import React, { useEffect, useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as Anim } from '../images/anim.svg';
import StarsCanvas from './StarsCanvas';
import Navbar from './Navbar';

const SharedLayout = () => {
  const [lap, setLap] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLap(false);
    }, 5000);
  }, []);
  const ddd = lap ? 'layout' : 'layout deactive';
  return (
    <>
      <StarsCanvas />
      <Navbar />
      <div className="right">
        <div className={ddd}>
          <Anim className="welcom" />
        </div>
        {/* <FaBars /> */}
        <Suspense fallback={<div>Loading... </div>}>
          <Outlet />
        </Suspense>
      </div>
      <div className="soon">
        <h2>Comming</h2>
        <h1>soon</h1>
      </div>
    </>
  );
};

export default SharedLayout;
