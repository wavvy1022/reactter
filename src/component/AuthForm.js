import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [errorTxt, setErrorTxt] = useState("");

    const onChange = (event) => {
        const{
            target : {name, value}
        } = event;

        if(name==="email"){
            setEmail(value)
        }else{
            setPassword(value)
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        
        try{
            if(newAccount){
                //create account
                authService.createUserWithEmailAndPassword(
                    email, password
                )
            }else{
                //log in
                authService.signInWithEmailAndPassword(
                    email, password
                )
            }
        }catch(errorObj){
            setErrorTxt(errorObj.message);
            console.log(errorTxt);
        }
    }

    const toggleAccount = () => {
        setNewAccount((prev)=>!prev)
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="container">
                <input 
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    onChange={onChange}
                    required 
                    value={email}
                    className="authInput"
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    onChange={onChange}
                    required 
                    className="authInput"
                    value={password}
                />
                <input type="submit" className="authInput authSubmit" value={newAccount ? "Create Account" : "log in"}/>
                {errorTxt}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount? "log in":"create account"}</span>
        </div>
    )
}

export default AuthForm;