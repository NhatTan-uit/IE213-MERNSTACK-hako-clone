import React from 'react'
import { useLocation } from 'react-router-dom'
import CartHistory from './CartHistory/CartHistory';
import ChangeUserPw from '../../functionality/ChangUserPw/ChangeUserPw'
import UserInfo from './UserInfo/UserInfo';

function DashBoard() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="mainpage__background__color">
      <div className='mainpage'>
        <UserInfo currentuser={location.state} />
        <div className="mainpage__container">
          <div className="mainpage__col__big flex__order__second">
            <CartHistory />
          </div>
          <div className="mainpage__col__small flex__first">
            <ChangeUserPw />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard