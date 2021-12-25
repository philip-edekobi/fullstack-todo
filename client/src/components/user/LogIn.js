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

export default function LogIn(){
    const [loggingIn, setLoggingIn] = useState(false);
    return (
    <Fragment className="auth-form">
            <Box style={mStyle}><Avatar style={{ m: "0 20", backgroundColor: "#66e" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Log in
            </Typography></Box>
            <Box component="form" className="container">
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
                {loggingIn ? <CircularProgress style={{color: "#fff"}} size="1.3rem" /> : "Log In"}
            </Button>
            <Grid container style={{marginTop: "2rem"}} >
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
    marginBottom: 0,
}