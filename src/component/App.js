import React, { useEffect, useState } from "react";
import AppRouter from "component/Router";
import {authService} from "fbase"

function App() {

  const [init, setinit] = useState(false)
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{

    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user)
      }else{
        setIsLoggedIn(false);
      }
      setinit(true)
    })
  },[isLoggedIn])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>:"initalizing..." }
      <footer>&copy;reactter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
