import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function Home(){

    const navigate = useNavigate();

    return (
        <>
            <main>
                <Typography variant="h1" class="styled-header">Welcome </Typography>
                <section class="page" >
                    <Button color="success"
                     variant="contained" onClick={() => navigate("/signup")}
                    >
                        Get Started
                    </Button>

                    <Typography class="" variant="body1" >OR</Typography>

                    <Button color="success"
                     variant="contained" onClick={() => navigate("/login")}
                    >
                        Log In and Continue
                    </Button>
                </section>
            </main>
            <footer>
                Poposki &copy; 2021
            </footer>
        </>
    );
}