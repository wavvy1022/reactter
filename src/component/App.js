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
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args)
        })
      }else{
        setIsLoggedIn(false);
      }
      setinit(true)
    })
  },[isLoggedIn])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args)
    });
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/>:"initalizing..." }
      <footer>&copy;reactter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
