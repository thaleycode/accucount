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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let passwordExpiryMonth = month + 6;

    
    let currentDate = `${year}-${month}-${day}`;
    let passwordExpiryDate = new Date(`${year}-${passwordExpiryMonth}-${day}`);
    let userMonthComponent = String(month).padStart(2, '0');
    
    console.log(currentDate)

    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const street = data.get('street');
    const city = data.get('city');
    const state = data.get('state');
    const zip = data.get('zip');
    const email = data.get('email');
    const password = data.get('password');

    const passwordExpiry = passwordExpiryDate;
    const active = false;
    const reactivateDate = null;
    const deactivateDate = null;

    const username = firstName.toLowerCase().charAt(0) + lastName.toLowerCase() + userMonthComponent + (year%100);

    
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
                />
              </Grid>
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