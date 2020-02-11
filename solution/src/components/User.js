import React, { useState } from 'react';

const User = props => {
    const { id, name, bio } = props.hobbit;
    const [editing, setEditing] = useState(false);
    const [newName, setName] = useState();
    const [newBio, setBio] = useState();

    const handleChanges = e => {

    }

    return(
        <div className='hobbit'>
            {!editing ? ( 
            <div >
                <h2 >{name}</h2>
                <p>{bio}</p>
            </div>
            ) : (
            <div>
                <input
                    type='text' 
                    value={`${name}`}
                />
                <textarea
                    value={`${bio}`}
                />
            </div>
            )}
        
        <button onClick={()=>setEditing(!editing)}>edit</button>
        <button>delete</button>
        </div>
    )
}
export default User;