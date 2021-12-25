import { 
    CircularProgress, 
    Button, 
    Box, 
    TextField,
    Typography,
    Avatar,
    Grid
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp(){
    const [signingIn, setSigningIn] = useState(false);

    return (
        <Fragment className="auth-form">
            <Box style={mStyle}><Avatar style={{ m: "0 20", backgroundColor: "#66e" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography></Box>
            <Box component="form" className="container">
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />

            <Button style={{
                height: "2.7rem",
                marginTop: "1.1rem",
                backgroundColor: "#66E"
            }} 
            fullWidth variant="contained">
                {signingIn ? <CircularProgress style={{color: "#fff"}} size="1.3rem" /> : "Sign Up"}
            </Button>
            <Grid container style={{marginTop: "1.7rem"}} >
              <Grid item>
                <Link to="/login" variant="body2">
                  Do you have an existing account? Log In
                </Link>
              </Grid>
            </Grid>
            </Box>
        </Fragment>
    );
}

const mStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "3rem",
    marginBottom: 0
}