import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDataLayerValue } from '../../../DataLayer';
import RemoveFromCart from '../../functionality/NovelButton/RemoveFromCart/RemoveFromCart';

function DashBoard() {
  const [{ cart }, dispatch] = useDataLayerValue();
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
              {(cart.length !== 0)? cart.map((item, key) => (
                <div className='novel__container' key={key}>
                  <img src={`/uploads/${item.novelImage}`} alt='...' />
                  <h4>{item.noveltitle}</h4>
                  <h4>{item.authorname}</h4>
                  <h4>{item.novelprice}</h4>
                  <div className="novel__btn__item">
                    <RemoveFromCart cartitem = {item}/>
                  </div>
                </div>
              )) : <div className='novel__container'><h4>Gio hang rong</h4></div>}
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