import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn';
import NewUserSubmit from './NewUserSubmit';
import Home from './home';
import ForgotPassword from './forgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
