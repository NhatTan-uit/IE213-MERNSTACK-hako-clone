import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDataLayerValue } from '../../../DataLayer';
import { useState } from 'react';
import RemoveFromCart from '../../functionality/NovelButton/RemoveFromCart/RemoveFromCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddCartToUser from '../../functionality/NovelButton/AddCartToUser/AddCartToUser';

function DashBoard() {
  const [{ user, cart, carttotal }, dispatch] = useDataLayerValue();
  const location = useLocation();

  function handleDecreaseQuantity(item) {
    if (item.quantity === 0) {
      alert("Khong the giam so luong")
    }
    else {
      item.quantity -= 1;
      item.totalprice = Number((item.totalprice - item.novelprice).toFixed(2));
      dispatch({
        type: "SET_CART_TOTAL_PRICE",
        carttotal: Number((carttotal - item.novelprice).toFixed(2))
      })
    }
  }

  function handleIncreaseQuantity(item) {
    item.quantity += 1;
    item.totalprice = Number((item.totalprice + item.novelprice).toFixed(2));
    dispatch({
      type: "SET_CART_TOTAL_PRICE",
      carttotal: Number((carttotal + item.novelprice).toFixed(2))
    })
  }

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
              <h3>My Cart</h3>
              {(cart.length !== 0) ? cart.map((item, key) => (
                <div className='novel__container' key={key}>
                  <div>
                    <img src={`/uploads/${item.novelImage}`} alt='...' />
                    <h4>{item.noveltitle}</h4>
                    <h4>{item.authorname}</h4>
                    <h4>{item.novelprice}</h4>
                  </div>
                  <div className="cartitem__price__container">
                    <div className="cartitem__quantity__button">
                      <IndeterminateCheckBoxIcon
                        style={{ "cursor": "pointer" }}
                        onClick={() => handleDecreaseQuantity(item)}
                      />
                      <p>{item.quantity}</p>
                      <AddBoxIcon
                        style={{ "cursor": "pointer" }}
                        onClick={() => handleIncreaseQuantity(item)}
                      />
                    </div>
                    <div className="cartitem__totalprice">
                      <label>Price:</label>
                      <p>{item.totalprice}</p>
                    </div>
                  </div>
                  <div className="novel__btn__item">
                    <RemoveFromCart cartitem={item} />
                  </div>
                </div>
              )) : <div className='novel__container'><h4>Gio hang rong</h4></div>}
              <div className="cartitem__totalprice__forpayment">
                <p>Here is summary price {carttotal}</p>
                <div className="novel__btn__item">
                  <AddCartToUser user={location.state._id} />
                </div>
              </div>
              <div>
                <hr></hr>
                <h3>My Cart Status</h3>
                {user && user.cart.map((item1, key) => (
                  <div key={key}>
                    <hr style={{"margin" : "20px 50px"}}></hr>
                    <h4>Cart id: {item1._id}</h4>
                    <h4>Total price {item1.totalcartprice}</h4>
                    {item1.usercart && item1.usercart.map((item2, key) => (
                      <div className='novel__container' key={key}>
                        <img src={`/uploads/${item2.novelImage}`} alt='...' />
                        <h4>{item2.noveltitle}</h4>
                        <h4>{item2.authorname}</h4>
                        <h4>{item2.quantity}</h4>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
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