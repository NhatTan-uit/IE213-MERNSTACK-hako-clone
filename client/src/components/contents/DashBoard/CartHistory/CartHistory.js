import React from 'react'
import { useLocation } from 'react-router-dom';
import { useDataLayerValue } from '../../../../DataLayer'
import ConfirmCartStatus from '../../../functionality/NovelButton/ConfirmCartStatus/ConfirmCartStatus';

function CartHistory() {
    const [{ user, allusers }, dispatch] = useDataLayerValue();

    const location = useLocation();
    console.log("my user location", location);

    return (
        <div className="carthistory__container">
            {user && !user.usertype && <h1>Cart History</h1>}
            {user && user.usertype && <h1>User's Pending Cart</h1>}
            <div>
                <hr></hr>
                {user && !user.usertype && <h3>My Cart Status</h3>}
                {user && !user.usertype && user.cart.map((item1, key1) => (
                    <div key={key1}>
                        <hr style={{ "margin": "20px 50px" }}></hr>
                        <h4>Cart id: {item1._id}</h4>
                        <h4>Total price {item1.totalcartprice}</h4>
                        {user && item1.cartstatus ?
                            <h4>Da thanh toan</h4>
                            :
                            <h4>Chua thanh toan</h4>}

                        {user && item1.usercart && item1.usercart.map((item2, key) => (
                            <div className='novel__container' key={key}>
                                <img src={`/uploads/${item2.novelImage}`} alt='...' />
                                <h4>{item2.noveltitle}</h4>
                                <h4>{item2.authorname}</h4>
                                <h4>{item2.quantity}</h4>
                            </div>
                        ))}
                    </div>
                ))}

                {user && user.usertype && allusers.map((item2, key2) => (
                    <div key={key2}>
                        {user && !item2.usertype && item2.cart.length !== 0 &&
                            <div>
                                <hr></hr>
                                <hr></hr>
                                <h4>{item2.username}</h4>
                                <hr></hr>
                                {user && item2.cart.length !== 0 && item2.cart.map((item3, key3) => (
                                    <div key={key3}>
                                        <hr></hr>
                                        {item3.totalcartprice}
                                        {user && item3.cartstatus ?
                                            <h4>Da thanh toan</h4>
                                            :
                                            <h4>Chua thanh toan</h4>}
                                        {user && item3.usercart.map((item4, key4) => (
                                            <div key={key4}>
                                                {item4.noveltitle}
                                            </div>
                                        ))}
                                        <div className='novel__btn__item'>
                                            <ConfirmCartStatus
                                                cartstate={{ userid: item2._id, cartid: item3._id }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CartHistory