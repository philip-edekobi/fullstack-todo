import Home from './Home'; 
import DashBoard from '../user/DashBoard';
import LogIn from '../user/LogIn';
import SignUp from '../user/SignUp';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

export default function App(){
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/todos" element={<DashBoard />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>
        </Router>
    );
}