import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LogIn from './pages/login/LogIn';
import NewUserSubmit from './pages/newUserSubmit/NewUserSubmit';
import Home from './pages/home/home';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ErrorPage from './pages/errorPage/ErrorPage';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/login"> Login </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
