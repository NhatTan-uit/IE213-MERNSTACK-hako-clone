import React, { useState } from 'react'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../../../DataLayer';
import ChangeUserAvatar from '../../../functionality/ChangeUserAvatar/ChangeUserAvatar';

function UserInfo({ currentuser }) {
    const [{ user }, dispatch] = useDataLayerValue();
    //chooser for update
    const [infochooser, setInfoChooser] = useState('dashboard__user__request__changing__info__hide');

    //user info name, about
    const [usernameinfo, setUserNameInfo] = useState('');
    const [useraboutinfo, setUserAboutInfo] = useState('');

    const navigate = useNavigate();

    //handle show info chooser
    const handleShowInfoChooser = () => {
        setInfoChooser('dashboard__user__request__changing__info');
    }

    //info chooser request info submit
    const changeInfoOnClick = (e) => {
        e.preventDefault();

        if (usernameinfo === '' || useraboutinfo === '') {
            alert("Vui long dien day du thong tin");
        }
        else {
            const newuserinfo = {
                name: usernameinfo,
                aboutme: useraboutinfo
            }

            axios
                .put(`http://localhost:4000/user/update/info/${currentuser._id}`, newuserinfo)
                .then(res => {
                })
                .catch(err => {
                    console.log(err);
                });

            alert("Your Info's been Updated Succesfully!!");
            navigate('/')
        }
    }

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

            <ChangeUserAvatar currentuser={currentuser}/>

            <div className='dashboard__user__info'>
                {/* User Name part*/}
                <div className='dashboard__user__name'>
                    <h2 style={{ "textAlign": "left" }}>Hello {currentuser.name}</h2>
                </div>

                {/* User about me part */}
                <div className='dashboard__user__info__child'>
                    <div className='dashboard__user__about'>
                        {currentuser.aboutme ?
                            <div>
                                {currentuser.aboutme}
                            </div> :
                            <div>
                                Hello to the world
                            </div>}
                    </div>

                    {/* button change user info */}
                    <div className='dashboard__user__info__change__button'>
                        <button onClick={handleShowInfoChooser}>change profile</button>
                    </div>
                </div>
            </div>

            <div className={infochooser}>
                <HighlightOffIcon
                    onClick={() => setInfoChooser('dashboard__user__request__changing__info__hide')}
                    fontSize="large"
                    style={{
                        "cursor": "pointer",
                        "float": "right",
                        "marginTop": "10px",
                        "marginRight": "10px"
                    }}
                />
                <div>
                    <div className="add__form">
                        <form onSubmit={changeInfoOnClick} encType='multipart/form-data'>
                            <h1>Change Profile</h1>
                            <br></br>

                            <label htmlFor='file'>My new name</label>
                            <input
                                value={usernameinfo ?? ""}
                                onChange={(e) => setUserNameInfo(e.target.value)}
                                className=''
                                type="text"
                            />
                            <br></br>
                            <label htmlFor='file'>About me</label>
                            <textarea
                                value={useraboutinfo ?? ""}
                                onChange={e => setUserAboutInfo(e.target.value)}
                                className=''
                                rows="3">
                            </textarea>

                            <button type="submit" >
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo