// import axios from '../api/axios';
import axios from 'axios';
import useAuth from './useAuth';

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    try {
      await axios.delete('/logout',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: auth.accessToken,
          },
          withCredentials: true,
        });
    } catch (err) {
      console.error(err);
    }
    setAuth({});
    localStorage.removeItem('token');
  };

  return logout;
};

export default useLogout;
