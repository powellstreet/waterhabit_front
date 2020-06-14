import React from 'react'

import UserRecords from './UserRecords';
import Profile from './Profile';
import WholeRecords from './WholeRecords';

const UserConsole = () => {
    return (
        <div>
            UserConsole
            <UserRecords/>
            <Profile/>
            <WholeRecords/>
        </div>
    )
}

export default UserConsole;
