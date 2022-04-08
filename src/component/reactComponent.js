import { dbService } from "fbase";
import React, { useState } from "react";

const ReactComponet = ({reactObj, isOwner}) => {

    const [editing, setEditing] = useState(false);
    const [newReact, setNewReact] = useState(reactObj.reacts)


    const onDeleteClick = async() =>{
        const ok = window.confirm("are you sure you want to delete this react?");
        if(ok){
            //delete
            await dbService.doc(`reacts/${reactObj.id}`).delete();
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
        <div>
            {editing?(
                <div>
                    <form onSubmit={onSubmit}>
                        <input onChange={onEditChange} value={newReact} placeholder="edit your reacts" type="text" required/>
                        <input type="submit" value="Update React"/>
                    </form>
                    <button onClick={toggleEditing}>cancel</button>
                </div>
            ) : (
                <>
                <h4>{reactObj.reacts}</h4>
                {isOwner?(
                    <div>
                        <button onClick={onDeleteClick}>delete</button>
                        <button onClick={toggleEditing}>edit</button>
                    </div>
                ) : null}
                </>
            )}


        </div>
    )
}

export default ReactComponet;