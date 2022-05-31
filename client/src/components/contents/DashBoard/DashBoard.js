import React from 'react'
import { useLocation } from 'react-router-dom'

function DashBoard() {
  const location = useLocation();

  console.log(location);

  return (
    <div className="mainpage__background__color">
      <div className='mainpage'>
        <div className="dashboard__container">
          <div className="dashboard__header">
            <h2>Hello {location.state.name}</h2>
          </div>
          <div className="mainpage__container">
            <div className="mainpage__col__big">
              Im big
            </div>
            <div className="mainpage__col__small">
              <h4>Change your password</h4>
              <div className="change__password">
                <label>Nhap mat khau hien tai</label>
                <input style={{ padding: '5px' }}></input>
                <br></br>
                <label>Xac nhan lai mat khau</label>
                <input style={{ padding: '5px' }}></input>
                <br></br>
                <label>Nhap mat khau moi</label>
                <input style={{ padding: '5px' }}></input>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard