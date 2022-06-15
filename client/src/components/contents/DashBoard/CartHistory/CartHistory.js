import React from 'react'
import { useDataLayerValue } from '../../../../DataLayer'

function CartHistory() {
    const [{ user }, dispatch] = useDataLayerValue();

    return (
        <div className="carthistory__container">
            <h1>Cart History</h1>
            <div>
                <hr></hr>
                <h3>My Cart Status</h3>
                {user && user.cart.map((item1, key) => (
                    <div key={key}>
                        <hr style={{ "margin": "20px 50px" }}></hr>
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
    )
}

export default CartHistory