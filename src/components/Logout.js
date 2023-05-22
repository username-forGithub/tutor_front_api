import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useLogout from '../hooks/useLogout';
import { setinitial } from '../slices/reservationSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useLogout();
  (async () => {
    await logout();
    dispatch(setinitial());
    navigate('/');
  })();
};

export default Logout;
