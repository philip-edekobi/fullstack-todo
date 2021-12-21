import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Home from './Home'; 
import DashBoard from '../user/DashBoard';

export default function App(){
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/todos" element={<DashBoard />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}