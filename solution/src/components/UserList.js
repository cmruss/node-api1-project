import React, { Component } from 'react';
import User from './User';

const UserList = (props) => {

    return (
        <div className='hobbit-list'>
            {props.hobbits.map(hobbit => (
                <User key={hobbit.id} hobbit={hobbit}/>
            ))}
        </div>
    )
}
export default UserList; 