import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

import ReactComponent from "component/ReactComponent";
import ReactFactory from "component/ReactFactory";

const Home = ({userObj}) =>{

    //firebase database에 있는 텍스트 리스트
    const [reactArr, setReactArr] = useState([]);

    // const getReacts = async() =>{
    //     const dbReacts = await dbService.collection("reacts").get();
    //     dbReacts.forEach(document=>{
    //         const reactsOjb = {
    //             ...document.data(),
    //             id : document.id
    //         }

    //         console.log(reactsOjb);
    //         setReactArr((prev) => [reactsOjb, ...prev])
    //     })
    // }

    useEffect(()=>{

        // const q = query(collection(dbService, "reacts"), orderBy("createdAt", "desc"));
        // onSnapshot(q, (snapshot) => {
        //     const reactArr = snapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         ...doc.data(),
        //         }));
        //     setReactArr(reactArr);
        // });

        dbService.collection("reacts").orderBy("createdAt","desc").onSnapshot(snapshot => {
            const reactsDb = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setReactArr(reactsDb)
        })
    },[])

    return (
        <div>
            <ReactFactory userObj={userObj}/>
            <div>
                {reactArr.map((react)=>(
                    <ReactComponent key={react.id} reactObj={react} isOwner={userObj.uid===react.creatorId}/>
                ))}
            </div>
        </div>
    )

} 
export default Home;