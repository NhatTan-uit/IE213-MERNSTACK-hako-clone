import React from 'react'
import ChangeUserAvatar from '../../../functionality/ChangeUserAvatar/ChangeUserAvatar';
import ChangeUserInfo from '../../../functionality/ChangeUserInfo/ChangeUserInfo';
import { useDataLayerValue } from '../../../../DataLayer';

function UserInfo({ user }) {
    const [{ colortoggleState }, dispatch] = useDataLayerValue();

    let x1 = '';

    if (colortoggleState) {
        x1 = 'mainpage__header__dark';
    }
    else {
        x1 = 'mainpage__header';
    }

    return (
        <div className={x1}>
            {/* user background color */}
            {user.currentuser && user.currentuser.userBgImage ?
                <img
                    className="dashboard__user__bgimage"
                    // onMouseOver={handleAppear}
                    // onMouseOut={handleHide}
                    src={`/uploads/${user.currentuser.userBgImage}`}
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

            <ChangeUserAvatar user={{ currentuser: user.currentuser, info: user.info }} />

            <ChangeUserInfo cuser={{ currentuser: user.currentuser, info: user.info }} />

        </div>
    )
}

export default UserInfo