import React from 'react'
import { useLocation } from 'react-router-dom'
import CartHistory from './CartHistory/CartHistory';
import ChangeUserPw from '../../functionality/ChangUserPw/ChangeUserPw'
import UserInfo from './UserInfo/UserInfo';
import { useDataLayerValue } from '../../../DataLayer';

function DashBoard() {
  const [{ colortoggleState }, dispatch] = useDataLayerValue();

  const location = useLocation();

  let x1 = '';

  if (colortoggleState) {
    x1 = 'mainpage__background__color__dark';
  }
  else {
    x1 = 'mainpage__background__color';
  }

  return (
    <div className={x1}>
      <div className='mainpage'>
        <UserInfo user={{ currentuser: location.state.user, info: location.state.info }} />
        <div className="mainpage__container">
          <div className="mainpage__col__big flex__order__second">
            {!location.state.info && <CartHistory />}
          </div>
          <div className="mainpage__col__small flex__first">
            {!location.state.info && <ChangeUserPw />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard