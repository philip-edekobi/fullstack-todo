import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
    const [username, setUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const navigate = useNavigate();

    async function signup(e){
        e.preventDefault();
        setSigningIn(true);
        const response = await axios.post('/api/signup', {
            name: username,
            email: userEmail,
            password: userPassword
        });
        switch(response.status){
            case 201:{
                setSigningIn(false);
                navigate('/todos');
                break;
            }
            case 409: {
                setSigningIn(false);
                const message = document.createElement("p");
                message.innerHTML = "This user already exists. Log in.";
                message.className = "error";
                document.body.appendChild(message);
                break;
            }
            case 500: {
                setSigningIn(false);
                const message = document.createElement("p");
                message.innerHTML = "An error occured on the server. Try again later";
                message.className = "error";
                document.body.appendChild(message);
                break;
            }
            default:{
                console.log("Something unexpected went wrong");
            }
        }
    }

    const handleNameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setUserEmail(e.target.value);
    const handlePasswordChange = (e) => setUserPassword(e.target.value);

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
              label="Name"
              name="name"
              autoComplete="name"
              value={username} onChange={handleNameChange}
            />
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
            fullWidth variant="contained"
            onClick={signup} 
            >
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