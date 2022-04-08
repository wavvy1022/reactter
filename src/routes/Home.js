import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = (userObj) =>{

    //저장될 텍스트 state
    const [reacts, setReact] = useState("");
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
        // getReacts();
        dbService.collection("reacts").onSnapshot(snapshot => {
            const reactsDb = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setReactArr(reactsDb)
            // console.log(reactsDb)
        })
    },[])

    const onSubmit = async(event) => {

        event.preventDefault();

        await dbService.collection("reacts").add({
            reacts,
            createdAt : Date.now(),
            creatorId : userObj.userObj.uid 
        });
        
        //input 초기화.
        setReact("")

    }

    const onChange = (event) => {
        const{
            target : {value}
        } = event;

        setReact(value);
    }
    return (
        <div>
            <form>
                <input value={reacts} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120}></input>
                <input type="submit" onClick={onSubmit} value="react"></input>
            </form>
            <div>
                {reactArr.map((react)=>(
                    <div key={react.id}>
                        <h4>{react.reacts}</h4>
                    </div>
                ))}
            </div>
        </div>
    )

} 
export default Home;