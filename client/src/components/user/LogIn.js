import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setLoggingIn(true);
        let response = await axios.post("/api/login", {email: userEmail, password: userPassword});
        switch(response.status){
            case 200: {
                setLoggingIn(false);
                navigate("/todos");
                break;
            }
            case 404: {
                setLoggingIn(false);
                const message = document.createElement("p");
                message.innerHTML = "This user does not exist. Please sign up.";
                message.className = "error";
                document.body.appendChild(message);
                break;
            }
            case 500: {
                setLoggingIn(false);
                const message = document.createElement("p");
                message.innerHTML = "An error occured on the server. Try again later";
                message.className = "error";
                document.body.appendChild(message);
                break;
            }
            default: {
                console.log("Something unexpected went wrong");
            }
        }
    }

    function handleEmailChange(e){
        setUserEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setUserPassword(e.target.value);
    }

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
              value={userEmail} onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={userPassword} onChange={handlePasswordChange}
            />

            <Button style={{
                height: "2.7rem",
                marginTop: "1.1rem",
                backgroundColor: "#66E"
            }} 
            fullWidth variant="contained" onClick={login}>
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