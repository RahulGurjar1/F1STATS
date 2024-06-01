import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Home} from './pages/home';
import {Profile} from './pages/profile';
export const  OurRoutes = ()   => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>
    )
}