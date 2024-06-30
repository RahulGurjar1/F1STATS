import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Home} from './pages/home';
import {Profile} from './pages/profile';
import {Navibar} from './components/navbar';
export const  OurRoutes = ()   => {
    return(
        <Router>
            <div>
                <Navibar></Navibar>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </div>
            
        </Router>
    )
}