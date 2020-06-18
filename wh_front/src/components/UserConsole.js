import React from 'react'

import UserRecords from './UserRecords';
import Profile from './Profile';
import WholeRecords from './WholeRecords';

const UserConsole = ({ history }) => {
    return (
        <div>
            UserConsole
            {/* <UserRecords/>
            <Profile/>
            <WholeRecords/> */}
            <button name="profile" onClick={() => history.push('/profile')}>프로필</button>
        </div>
    )
}

export default UserConsole;
