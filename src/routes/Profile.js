import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import React from "react";

const Profile = () => {

    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }

    return (
        <div>
            <span>profile</span>
            <button onClick={onLogOutClick} Link="/">log out</button>
        </div>
    )
}

export default Profile;