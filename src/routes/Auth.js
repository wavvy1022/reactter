import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [errorTxt, setErrorTxt] = useState("")

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

    const onSocialClick = async (event) => {
        const{
            target : {name}
        } = event;

        let provider;
        if(name==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }else if(name==="google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data  = await authService.signInWithPopup(provider);
        console.log(data);
    }

    const toggleAccount = () => {
        setNewAccount((prev)=>!prev)
      }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    onChange={onChange}
                    required 
                    value={email}
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    onChange={onChange}
                    required 
                    value={password}
                />
                <input type="submit" value={newAccount ? "Create Account" : "log in"}/>
                {errorTxt}
            </form>
            <span onClick={toggleAccount}>{newAccount? "log in":"create account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">continue with google</button>
                <button onClick={onSocialClick} name="github">continue with github</button>
            </div>
        </div>
    )
} 
export default Auth;
