import React, { useState } from 'react'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../../../DataLayer';

function UserInfo({ currentuser }) {
    const [{ user }, dispatch] = useDataLayerValue();
    const [hoverstate, setHoverState] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [imgstate, setImgState] = useState('dashboard__user__image');
    //chooser for update
    const [imgchooser, setImgChooser] = useState('dashboard__user__request__changing__img__hide');
    const [infochooser, setInfoChooser] = useState('dashboard__user__request__changing__info__hide');

    //user info name, about
    const [usernameinfo, setUserNameInfo] = useState('');
    const [useraboutinfo, setUserAboutInfo] = useState('');

    const navigate = useNavigate();

    //handle img appear/hide
    const handleAppear = () => {
        setHoverState(true);
        setImgState('dashboard__user__image__hover');
    }
    const handleHide = () => {
        setHoverState(false);
        setImgState('dashboard__user__image');
    }

    //handle show img chooser
    const handleShowImgChooser = () => {
        setImgChooser('dashboard__user__request__changing__img');
    }

    //handle show info chooser
    const handleShowInfoChooser = () => {
        setInfoChooser('dashboard__user__request__changing__info');
    }

    //img chooser request img submit
    const changeOnClick = (e) => {
        e.preventDefault();

        if (userImage === '') {
            alert("Vui long chon anh");
        }
        else {
            const formData = new FormData();

            formData.append("userImage", userImage);

            axios
                .put(`http://localhost:4000/user/update/img/${currentuser._id}`, formData)
                .then(res => {
                })
                .catch(err => {
                    console.log(err);
                });

            alert("Image Updated Succesfully!!");
            setImgChooser('dashboard__user__request__changing__img__hide');
            navigate('/');
        }
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
            setInfoChooser('dashboard__user__request__changing__info__hide');
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

            <div className='dashboard__user__image__container'>
                {/* User Avatar part */}
                {currentuser.userImage ?
                    <img
                        className={imgstate}
                        onMouseOver={handleAppear}
                        onMouseOut={handleHide}
                        src={`/uploads/${currentuser.userImage}`}
                        alt='...'
                    />
                    :
                    <img
                        className={imgstate}
                        onMouseOver={handleAppear}
                        onMouseOut={handleHide}
                        src={`/uploads/nonuser.png`}
                        alt='...'
                    />}

                {hoverstate && user &&
                    <div onMouseOver={handleAppear} onMouseOut={handleAppear} className='dashboard__user__image__file'>
                        <CameraAltOutlinedIcon onClick={handleShowImgChooser} fontSize='large' />
                    </div>}
            </div>

            <div className={imgchooser}>
                <HighlightOffIcon
                    onClick={() => setImgChooser('dashboard__user__request__changing__img__hide')}
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
                        <form onSubmit={changeOnClick} encType='multipart/form-data'>
                            <h1>Change Profile Image</h1>
                            <br></br>

                            <div className="form__group">
                                <label htmlFor='file'>Choose your image</label>
                                <br></br>
                                <input
                                    onChange={(e) => setUserImage(e.target.files[0])}
                                    className='form__control__file'
                                    type="file"
                                    filename='novelImage'
                                />
                            </div>

                            <button type="submit" >
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='dashboard__user__info'>
                {/* User Name part*/}
                <div className='dashboard__user__name'>
                    <h2 style={{"textAlign": "left"}}>Hello {currentuser.name}</h2>
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