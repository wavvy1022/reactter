import React, { useState } from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth"
import Home from "../routes/Home";
import Navigation from "component/navigation";
import Profile from "routes/Profile";


const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? 
                <>
                <Route exact={true} path="/" element={<Home userObj={userObj}/>}/> 
                <Route exact={true} path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} replace to="/"/>}/> 
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