import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/Home/HomePage';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login/Login';
import ProtectRouter from './components/RouterProtection/ProtectedRouter';
import Profile from './components/Profile/Profile';
import UsersList from './components/UsersList/UsersList';
import UpdateProfile from './components/Profile/UpdateProfile';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Public Routers */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Can Access User only */}
        <Route path="/" element={<ProtectRouter allowedRoles={["User"]} />} >
          <Route path='profile/:id' element={<Profile />} />
          <Route path='users' element={<UsersList />} />
          <Route path='update-profile/:id' element={<UpdateProfile />} />
        </Route>


      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
