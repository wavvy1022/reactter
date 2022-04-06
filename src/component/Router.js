import React, { useState } from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth"
import Home from "../routes/Home";
import Navigation from "component/navigation";
import Profile from "routes/Profile";


const AppRouter = ({isLoggedIn}) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? 
                <>
                <Route exact={true} path="/" element={<Home/>}/> 
                <Route exact={true} path="/profile" element={<Profile replace to="/"/>}/> 
                </>
                : 
                <>
                <Route exact={true} path="/" element={<Auth/>}/>
                </>
                }
            </Routes>
        </Router>
    )
}

export default AppRouter;