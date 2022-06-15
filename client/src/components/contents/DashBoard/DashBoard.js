import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CartHistory from './CartHistory/CartHistory';
import UserChangePass from './UserChangePass/UserChangePass';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

function DashBoard() {
  const location = useLocation();
  const [hoverstate, setHoverState] = useState();
  const [imgstate, setImgState] = useState('dashboard__user__image');

  const handleAppear = () => {
    setHoverState(true);
    setImgState('dashboard__user__image__hover');
  }

  const handleHide = () => {
    setHoverState(false);
    setImgState('dashboard__user__image');
  }

  const handleChangeUserImage = () => {
    alert("Image is under changing");
  }
  
  console.log(location);

  return (
    <div className="mainpage__background__color">
      <div className='mainpage'>
        <div className="mainpage__header">
          <div className='dashboard__user__name'>
            <h2>Hello {location.state.name}</h2>
          </div>
          {location.state.userImage ?
            <img
              className={imgstate}
              onMouseOver={handleAppear}
              onMouseOut={handleHide}
              src={`/uploads/${location.state.userImage}`}
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
          {hoverstate &&
            <div onMouseOver={handleAppear} onMouseOut={handleAppear} className='dashboard__user__image__file'>
              <CameraAltOutlinedIcon fontSize='large' onClick={handleChangeUserImage}/>
            </div>}
          {location.state.aboutme ?
            <div>
              {location.state.aboutme}
            </div> :
            <div>
              Hello the the world
            </div>}
        </div>
        <div className="mainpage__container">
          <div className="mainpage__col__big flex__order__second">
            <CartHistory />
          </div>
          <div className="mainpage__col__small flex__first">
            <UserChangePass />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard