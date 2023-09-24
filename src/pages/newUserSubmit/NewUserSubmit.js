import * as React from 'react';
import { useState } from 'react';
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
import Axios from '../../Axios'

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

export default function NewUserSubmit() {

  const [errorMessage, setErrorMessage] = useState("");

  function handlePassword(event) {
    const new_pass = event.target.value;


    // regular expressions to validate password
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialChar = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
    if ((!new_pass.charAt(0).match(lowerCase)) && (!new_pass.charAt(0).matchupperCase)) {
      setErrorMessage("Password should start with a letter");
    } else if (!new_pass.match(upperCase)) {
       setErrorMessage("Password should contain uppercase letters!");
    } else if (!new_pass.match(lowerCase)) {
      setErrorMessage("Password should contain lowercase letters!");
    } else if (!new_pass.match(numbers)) {
       setErrorMessage("Password should contain a number!");
    } else if (!new_pass.match(specialChar)) {
      setErrorMessage("Password should contain a special character (!, @, #, $, etc)");
    } else if (new_pass.length < 8) {
       setErrorMessage("Password length should be 8 or more characters.");
    } else {
       setErrorMessage(""); 
    }
 }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    
    const passwordExpiryDate = date.setMonth(date.getMonth() + 6);
    const userMonthComponent = String(month).padStart(2, '0');
    

    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const street = data.get('street');
    const city = data.get('city');
    const state = data.get('state');
    const zip = data.get('zip');
    const email = data.get('email');
    const password = data.get('password');
    const DOB = data.get('DOB');

    const passwordExpiry = passwordExpiryDate;
    const active = false;
    const reactivateDate = new Date(1975, 0, 1, 0, 0, 0, 0);
    const deactivateDate = new Date(1975, 0, 2, 0, 0, 0, 0);

    const username = firstName.toLowerCase().charAt(0) + lastName.toLowerCase() + userMonthComponent + (year%100);

    console.log(passwordExpiry)
    
    Axios.post("/login/add", {username, email, password, passwordExpiry, active, deactivateDate, reactivateDate})
      .then()
      .catch((error) => alert(error.message))
    Axios.post("/user/add", {firstName, lastName, street, city, state, zip, email})
      .then(window.location = '/formSubmitted')
      .catch((error) => alert(error.message))
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
            Submit new user data
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  onChange={handlePassword}
                />
              </Grid>
              <div style = {{ color: "red" }}> {errorMessage} </div>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street Address"
                  name="street"
                  autoComplete="street"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="city"
                  id="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="state"
                  name="state"
                  required
                  fullWidth
                  id="state"
                  label="State"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="zip"
                  label="Zip Code"
                  name="zip"
                  autoComplete="zipCode"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="../logIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}