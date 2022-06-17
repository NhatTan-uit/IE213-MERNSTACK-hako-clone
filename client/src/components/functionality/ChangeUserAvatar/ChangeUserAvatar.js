import React, { useState } from 'react'
import { useDataLayerValue } from '../../../DataLayer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ChangeUserAvatar({ currentuser }) {
    const [{ user }, dispatch] = useDataLayerValue();

    const [imgchooser, setImgChooser] = useState('dashboard__user__request__changing__img__hide');
    const [hoverstate, setHoverState] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [imgstate, setImgState] = useState('dashboard__user__image');

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
            navigate('/');
        }
    }

    return (
        <div>
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
        </div>
    )
}

export default ChangeUserAvatar