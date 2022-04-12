import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import ReactComponent from "component/reactComponent";

const Home = ({userObj}) =>{

    //저장될 텍스트 state
    const [reacts, setReact] = useState("");
    //firebase database에 있는 텍스트 리스트
    const [reactArr, setReactArr] = useState([]);
    //file upload
    const [attachment, setAttachment] = useState("");

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
        })
    },[])

    const onSubmit = async(event) => {

        event.preventDefault();

        if(!reacts.trim()){
            return;
        }

        let attachmentUrl = "";
        //파일 업로드 유무 분기처리
        if(attachment!==""){
            //firebase Storage 이미지 업로드 경로 및 파일명 uuid로 생성
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            //파일업로드
            const response = await fileRef.putString(attachment, "data_url");
            //firebaseStorage에 업로드 된 이미지 경로
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const reactObj = {
            reacts,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl
        }

        await dbService.collection("reacts").add(reactObj);
        
        //input 초기화.
        setReact("");

        //이미지 초기화
        setAttachment(null);

    }

    const onChange = (event) => {
        const{
            target : {value}
        } = event;

        setReact(value);
    }

    //setImage
    const onFileChange = (event) => {
        
        const {
            target : {files}
        } = event;

        const theFile = files[0];

        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result }
            } = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)

    }

    //이미지 초기화
    const onClearAttachmentClick = () => {
        setAttachment(null)
    }

    return (
        <div>
            <form>
                <input 
                    value={reacts} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="what's on your mind?" 
                    required maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input 
                    type="submit" 
                    onClick={onSubmit} 
                    value="react"
                />
                {attachment &&(
                    <div>
                        <img src={attachment} witdh="50px" height="50px"/>
                        <button onClick={onClearAttachmentClick}>clear</button>
                    </div>
                    
                    )
                }
                
            </form>
            <div>
                {reactArr.map((react)=>(
                    <ReactComponent key={react.id} reactObj={react} isOwner={userObj.uid===react.creatorId}/>
                ))}
            </div>
        </div>
    )

} 
export default Home;