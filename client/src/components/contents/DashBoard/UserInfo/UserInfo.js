import React from 'react'
import ChangeUserAvatar from '../../../functionality/ChangeUserAvatar/ChangeUserAvatar';
import ChangeUserInfo from '../../../functionality/ChangeUserInfo/ChangeUserInfo';

function UserInfo({ currentuser }) {
    return (
        <div className="mainpage__header">
            {/* user background color */}
            {currentuser.userBgImage ?
                <img
                    className="dashboard__user__bgimage"
                    // onMouseOver={handleAppear}
                    // onMouseOut={handleHide}
                    src={`/uploads/${currentuser.userBgImage}`}
                    alt='...'
                />
                :
                <img
                    className="dashboard__user__bgimage"
                    // onMouseOver={handleAppear}
                    // onMouseOut={handleHide}
                    src={`/uploads/nonbgimage.png`}
                    alt='...'
                />}

            <ChangeUserAvatar currentuser={currentuser} />

            <ChangeUserInfo currentuser={currentuser} />

        </div>
    )
}

export default UserInfo