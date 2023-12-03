import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Axios from '../../Axios';
import { useEffect, useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        AccuCount Accounting Services
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function LogIn() {
  let navigate = useNavigate();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [accountActive, setAccountActive] = useState(true);

   const deactivateAccount = (data) => {
    const username = data.get('username');
    // Make an API call to deactivate the user's account
    Axios.post("/deactivate-account", { username })
      .then((result) => {
        // Handle the result, e.g., show a message to the user
      })
      .catch((error) => {
        alert("Failed to deactivate account: " + error.message);
      });
  };

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get('http://localhost:3001')
    .then( res => {
      if (res.data.valid) {
        navigate('/');
      }
    })
    .catch(err => console.log(err))
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const username = data.get('username');
    const password = data.get('password');
    
    if (!accountActive) {
      alert('Account is not active');
      return;
    }

    Axios.post("/login/", { username, password })
      .then(result => {
        console.log(result)
        if (result.data.info === "Logged in") {
          //console.log(result)
          setLoginAttempts(0);
          navigate('/')
        }
      })
      .catch((error) => {
        alert(error.message);
        setLoginAttempts((prevAttempts) => prevAttempts + 1);

        // Check if the maximum login attempts (3) have been reached
        if (loginAttempts + 1 >= 3) {
          deactivateAccount(data);
        }
      });
  };

  return (
  
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {accountActive ? null : (
              <Typography variant="body2" color="error" align="center">
                Account is not active
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="../forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="../newUserSubmit" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
   
  );
}