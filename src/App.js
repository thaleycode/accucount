import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LogIn from './pages/login/LogIn';
import Home from './pages/home/home';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ErrorPage from './pages/errorPage/ErrorPage';
import { Navbar, Container, Nav } from 'react-bootstrap';
import NewUserSubmit from './pages/newUserSubmit/NewUserSubmit';
import TempSuspend from './pages/tempSuspend/TempSuspend';
import FormSubmitted from './pages/formSubmitted/FormSubmitted';
import AddAccount from './pages/addAccount/AddAccount';
import AccountList from './pages/accountList/AccountList';
import logo from './img/logo.svg';
import ChartOfAccounts from './pages/chartOfAccounts/ChartOfAccounts';
import GenerateReports from './pages/generateReports/GenerateReports';
import Journal from './pages/journal/Journal';
import Reports from './pages/reports/Reports';
import UserManagement from './pages/userManagement/UserManagement';
import AccountDetails from './components/AccountDetails';
import Axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Use useEffect to check if the user is logged in when the component mounts
  
  useEffect(() => {
    Axios.get('http://localhost:3001')
      .then((res) => {
        if (res.data.valid) {
          setUsername(res.headers['x-username']); // Extract username from the header
        }
      })
      .catch((err) => {
        console.error('Error fetching username:', err);
      });
  });

  return (
    <Router>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
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
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/">
                  {username}
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  LogIn
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/newUserSubmit" element={<NewUserSubmit />} />
        <Route path="/tempSuspend" element={<TempSuspend />} />
        <Route path="/formSubmitted" element={<FormSubmitted />} />
        <Route path="/addAccount" element={<AddAccount />} />
        <Route path="/accountList" element={<AccountList />} />
        <Route path="/chartOfAccounts" element={<ChartOfAccounts />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/generateReports" element={<GenerateReports />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/account/:accountNumber" component={<AccountDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
