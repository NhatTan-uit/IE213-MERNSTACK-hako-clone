import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../../DataLayer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ChangeUserInfo({ cuser }) {
    const userid = localStorage.getItem('user');
    const [{ user }, dispatch] = useDataLayerValue();

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
                .put(`http://localhost:4000/user/update/info/${cuser.currentuser._id}`, newuserinfo)
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
        <div className='dashboard__user__info'>
            {/* User Name part*/}
            <div className='dashboard__user__name'>
                <h2 style={{ "textAlign": "left" }}>Hello {cuser.currentuser.name}</h2>
            </div>

            {/* User about me part */}
            <div className='dashboard__user__info__child'>
                <div className='dashboard__user__about'>
                    {cuser.currentuser.aboutme ?
                        <div>
                            {cuser.currentuser.aboutme}
                        </div> :
                        <div>
                            Hello to the world
                        </div>}
                </div>

                {/* button change user info */}
                {userid === cuser.currentuser._id && <div className='dashboard__user__info__change__button'>
                    <button onClick={handleShowInfoChooser}>change profile</button>
                </div>}
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

export default ChangeUserInfo