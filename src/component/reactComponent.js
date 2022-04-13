import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const ReactComponet = ({reactObj, isOwner}) => {

    const [editing, setEditing] = useState(false);
    const [newReact, setNewReact] = useState(reactObj.reacts)


    const onDeleteClick = async() =>{
        const ok = window.confirm("are you sure you want to delete this react?");
        if(ok){
            //delete
            await dbService.doc(`reacts/${reactObj.id}`).delete();
            //트윗삭제시 storage에 있는 이미지 파일 삭제처리
            await storageService.refFromURL(reactObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => {
        setEditing(prev => !prev);
    }

    const onEditChange = (event) => {
        const {
            target: {value}
        } =  event;

        setNewReact(value);
    }

    const onSubmit = async(event) =>{
        event.preventDefault();
        await dbService.doc(`reacts/${reactObj.id}`).update({
            reacts: newReact
        })
        setEditing(false);
    }

    return(
        <div className="nweet">
            {editing?(
                <div>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input 
                            onChange={onEditChange} 
                            value={newReact} 
                            autoFocus 
                            className="formInput" 
                            placeholder="edit your reacts" 
                            type="text" 
                            required
                        />
                        <input type="submit" value="Update React" className="formBtn"/>
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </div>
            ) : (
                <>
                <h4>{reactObj.reacts}</h4>
                {reactObj.attachmentUrl && <img src={reactObj.attachmentUrl}/>}
                {isOwner && (
                    <>
                        <div className="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                        </div>
                    </>
                )}
                </>
            )}


        </div>
    )
}

export default ReactComponet;