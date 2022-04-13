import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Profile = ({refreshUser,userObj}) => {

    const navigate = useNavigate();

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }

    const getMyReacts = async() => {
        const reacts = await dbService
            .collection("reacts")
            .where("creatorId","==",userObj.uid)
            .orderBy("createdAt")
            .get();

        // console.log(reacts.docs.map(doc => doc.data()));
    }

    const onChange = (event) => {
        const {
            target : {value}
        } = event
        setNewDisplayName(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName : newDisplayName
            });
            refreshUser();
        }

    }

    useEffect(()=>{
        getMyReacts();
    },[])

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type="text" 
                    autoFocus
                    placeholder="Display Name" 
                    onChange={onChange} 
                    value={newDisplayName}
                />
                <input 
                    type="submit" 
                    value="update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                      }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
}

export default Profile;