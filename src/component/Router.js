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
            <div
                style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Routes>
                    {isLoggedIn ? 
                    <>
                    <Route path="/" element={<Home userObj={userObj}/>}/> 
                    <Route path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} replace to="/"/>}/> 
                    </>
                    : 
                    <>
                    <Route path="/" element={<Auth/>}/>
                    </>
                    }
                </Routes>
            </div>
        </Router>
    )
}

export default AppRouter;