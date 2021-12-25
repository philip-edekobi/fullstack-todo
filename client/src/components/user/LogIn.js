import { 
    CircularProgress, 
    Button, 
    Box, 
    TextField
} from "@mui/material";
import { useState } from 'react';

export default function LogIn(){
    const [loggingIn, setLoggingIn] = useState(false);
    return (
        <>
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
                height: "2.4rem",
                marginTop: "0.5rem"
            }} 
            fullWidth variant="contained">
                {loggingIn ? <CircularProgress style={{color: "#fff"}} size="1.3rem" /> : "Log In"}
            </Button>
            </Box>
        </>
    );
}