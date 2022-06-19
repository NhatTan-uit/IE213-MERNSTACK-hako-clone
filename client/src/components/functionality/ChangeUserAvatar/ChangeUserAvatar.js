import React, { useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDataLayerValue } from '../../../DataLayer';

function ChangeUserAvatar({ user }) {
    const [{ colortoggleState }, dispatch] = useDataLayerValue();
    const userid = localStorage.getItem('user');
    const location = useLocation();

    const [imgchooser, setImgChooser] = useState('dashboard__user__request__changing__img__hide');
    const [imgchooserdark, setImgChooserDark] = useState('dashboard__user__request__changing__img__hide__dark');
    const [hoverstate, setHoverState] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [imgstate, setImgState] = useState('dashboard__user__image');

    let x1 = '';

    if (colortoggleState) {
        x1 = imgchooser;
    }
    else x1 = imgchooserdark;


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
        if (colortoggleState) {
            setImgChooser('dashboard__user__request__changing__img');
        }
        else setImgChooserDark('dashboard__user__request__changing__img__dark')
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

            const formData1 = new FormData();
            formData1.append("userid", user.currentuser._id);
            formData1.append("crruserImg", userImage.name);

            axios
                .put(`http://localhost:4000/user/update/img/${user.currentuser._id}`, formData)
                .then(res => {
                })
                .catch(err => {
                    console.log(err);
                });

            axios
                .put(`http://localhost:4000/novels/user/update/comment/img`, formData1)
                .then(res => {
                })
                .catch(err => {
                    console.log(err);
                });

            alert("Image Updated Succesfully!!");
            navigate('/');
        }
    }

    return (
        <div>
            <div className='dashboard__user__image__container'>
                {/* User Avatar part */}
                {user.currentuser.userImage ?
                    <img
                        className={imgstate}
                        onMouseOver={handleAppear}
                        onMouseOut={handleHide}
                        src={`/uploads/${user.currentuser.userImage}`}
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

                {userid === user.currentuser._id && hoverstate &&
                    <div onMouseOver={handleAppear} onMouseOut={handleAppear} className='dashboard__user__image__file'>
                        <CameraAltOutlinedIcon onClick={handleShowImgChooser} fontSize='large' />
                    </div>}
            </div>

            <div className={x1}>
                <HighlightOffIcon
                    onClick={() => {
                        if (colortoggleState) {
                            setImgChooser('dashboard__user__request__changing__img__hide');
                        }
                        else setImgChooserDark('dashboard__user__request__changing__img__hide__dark');
                    }}
                    fontSize="large"
                    style={{
                        "cursor": "pointer",
                        "float": "right",
                        "marginTop": "10px",
                        "marginRight": "10px"
                    }}
                />
                <div className="add__form__except">
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
        </div>
    )
}

export default ChangeUserAvatar