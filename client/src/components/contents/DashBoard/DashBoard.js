import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CartHistory from './CartHistory/CartHistory';
import UserChangePass from './UserChangePass/UserChangePass';

function DashBoard() {
  const location = useLocation();
  const [hoverstate, setHoverState] = useState();

  const handleAppear = () => {
    setHoverState(true);
  }

  const handleHide = () => {
    setHoverState(false);
  }

  console.log(location);

  return (
    <div className="mainpage__background__color">
      <div className='mainpage'>
        <div className="mainpage__header">
          <div>
            <h2>Hello {location.state.name}</h2>
            {location.state.userImage ?
              <div className='dashboard__user__image' onMouseOver={handleAppear} onMouseOut={handleHide}>
                <img src={`/uploads/${location.state.userImage}`} alt='...' />
              </div> :
              <div className='dashboard__user__image' onMouseOver={handleAppear} onMouseOut={handleHide}>
                <img src={`/uploads/nonuser.png`} alt='...' />
              </div>}
            {hoverstate && <div>File chooser</div>}
            {location.state.aboutme ?
              <div>
                {location.state.aboutme}
              </div> :
              <div>
                Hello the the world
              </div>}
          </div>
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