import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDataLayerValue } from '../../../DataLayer';
import RemoveFromCart from '../../functionality/NovelButton/RemoveFromCart/RemoveFromCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddCartToUser from '../../functionality/NovelButton/AddCartToUser/AddCartToUser';

function UserCart() {
    const [{ cart, carttotal }, dispatch] = useDataLayerValue();
    const location = useLocation();

    console.log(location);

    function handleDecreaseQuantity(item) {
        if (item.quantity === 1) {
            if (window.confirm("Bạn muốn xóa khỏi giỏ hàng?")) {
                dispatch({
                    type: "SET_CART_TOTAL_PRICE",
                    carttotal: Number((carttotal - item.totalprice).toFixed(2))
                });
                dispatch({
                    type: 'SET_CART',
                    cart: cart.filter(i => i._id !== item._id)
                });
                alert("Xoa khoi gio hang thanh cong");
            }
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

    return (

        <div className='mainpage__background__color'>
            <div className="mainpage">
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
            </div>
        </div>
    )
}

export default UserCart