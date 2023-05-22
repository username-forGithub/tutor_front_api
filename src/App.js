import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './components/RequireAuth';
import AddTutor from './components/AddTutor';
import DeleteTutor from './components/DeleteTutor';
import MyReservations from './components/MyReservations';
import TutorListing from './components/TutorListing';
import SharedLayout from './components/SharedLayout';
import Logout from './components/Logout';
import PersistLogin from './components/PersistLogin';
import Login from './components/Login';
import Register from './components/Register';
import Reserve from './components/Reserve';
import SingleTutor from './components/SingleTutor';
import AddReserve from './components/AddReserve';

const ROLES = {
  User: 1,
  Editor: 1984,
  Admin: 3,
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<TutorListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
                <Route path="tutors/:tutorId" element={<SingleTutor />} />
                <Route path="addtutors" element={<AddTutor />} />
                <Route path="deltutors" element={<DeleteTutor />} />
                <Route path="addreserve/:tutorId" element={<AddReserve />} />
                <Route path="reservedtutors" element={<MyReservations />} />
                <Route path="reserve" element={<Reserve />} />
                <Route path="logout" element={<Logout />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
