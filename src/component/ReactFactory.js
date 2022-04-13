import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const ReactFactory = ({userObj}) =>{

    //저장될 텍스트 state
    const [reacts, setReact] = useState("");
    //file upload
    const [attachment, setAttachment] = useState("");

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
    const onClearAttachment = () => {
        setAttachment(null)
    }

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input 
                    className="factoryInput__input"
                    value={reacts} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="what's on your mind?" 
                    required maxLength={120}
                />
                <input 
                    className="factoryInput__arrow"
                    type="submit" 
                    value="react"
                />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input 
                id="attach-file" 
                type="file" 
                accept="image/*" 
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />

            {attachment &&(
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                
                )
            }
        </form>
    )
}

export default ReactFactory;