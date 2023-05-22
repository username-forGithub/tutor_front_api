import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('https://tutorback-api.onrender.com/current_user',
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
        withCredentials: true,
      });
    setAuth((prev) => ({
      ...prev,
      roles: [response.data.data.role],
      user: response.data.data.email,
      accessToken: localStorage.getItem('token'),
      id: response.data.data.id,
    }));
    return localStorage.getItem('token');
  };
  return refresh;
};
export default useRefreshToken;
