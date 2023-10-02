import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LogIn from './pages/login/LogIn';
import Home from './pages/home/home';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ErrorPage from './pages/errorPage/ErrorPage';
import { Navbar, Container, Nav } from 'react-bootstrap';
import NewUserSubmit from './pages/newUserSubmit/NewUserSubmit';
import Admin from './pages/admin/Admin';
import TempSuspend from './pages/tempSuspend/TempSuspend';
import FormSubmitted from './pages/formSubmitted/FormSubmitted';
import logo from './img/logo.svg';


function App() {
  return (
    <Router>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={ Link } to="/">
            <img
              alt=""
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            AccuCount
          </Navbar.Brand>
            <Nav className="d-flex justify-content-end">
              <Nav.Link as={ Link } to="/login">LogIn</Nav.Link>
              <Nav.Link as={ Link } to="/">Logout</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/newUserSubmit" element={<NewUserSubmit />} />
        <Route path="/tempSuspend" element={<TempSuspend />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/formSubmitted" element={<FormSubmitted />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
