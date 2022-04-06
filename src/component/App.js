import React, { useEffect, useState } from "react";
import AppRouter from "component/Router";
import {authService} from "fbase"

function App() {

  console.log(authService.currentUser);
  const [init, setinit] = useState(false)
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(()=>{

    authService.onAuthStateChanged(function(user){
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setinit(true)
    })
  },[isLoggedIn])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/>:"initalizing..." }
      <footer>&copy;reactter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
