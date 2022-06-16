import React from 'react'
import { useLocation } from 'react-router-dom'
import CartHistory from './CartHistory/CartHistory';
import UserChangePass from './UserChangePass/UserChangePass';
import UserInfo from './UserInfo/UserInfo';

function DashBoard() {
  const location = useLocation();

  console.log(location);

  return (
    <div className="mainpage__background__color">
      <div className='mainpage'>
        <UserInfo user={location.state} />
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