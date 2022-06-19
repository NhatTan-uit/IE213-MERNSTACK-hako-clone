import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDataLayerValue } from '../../../DataLayer';
import RemoveFromCart from '../../functionality/NovelButton/RemoveFromCart/RemoveFromCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddCartToUser from '../../functionality/NovelButton/AddCartToUser/AddCartToUser';

function UserCart() {
    const [{ cart, carttotal, colortoggleState }, dispatch] = useDataLayerValue();
    const location = useLocation();

    let x1 = '';
    let x2 = '';

    if (colortoggleState) {
        x1 = 'mainpage__background__color__dark';
        x2 = 'cart__novel__container__dark';
    }
    else {
        x1 = 'mainpage__background__color';
        x2 = 'cart__novel__container';
    }

    function handleDecreaseQuantity(item) {
        if (item.quantity > 1) {
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
        <div className={x1}>
            <div className="mainpage">
                <div className='mainpage__header__img__shadow'></div>
                {colortoggleState ?
                    <div className='mainpage__header__img'>
                        <img src={`/uploads/Dark-theme.png`} alt='' />
                    </div>
                    :
                    <div className='mainpage__header__img'>
                        <img src={`/uploads/Light-theme.png`} alt='' />
                    </div>
                }

                <div className='cart__container'>
                    <h2>My Cart</h2>
                    {(cart.length !== 0) ? cart.map((item, key) => (
                        <div className={x2} key={key}>
                            <div className='cartitem__info__container'>
                                <img src={`/uploads/${item.novelImage}`} alt='...' />
                            </div>
                            <div className='cartitem__counter__container'>
                                <div className='cartitem__otherinfo__container'>
                                    <h3 style={{"marginBottom" : "10px"}}>Tên truyện:  <span style={{"fontWeight" : "normal"}}>{item.noveltitle}</span></h3>
                                    <h4>Tác giả:  <span style={{"fontWeight" : "normal"}}>{item.authorname}</span></h4>
                                    <h4>Giá:  <span style={{"fontWeight" : "normal"}}>{item.novelprice}</span></h4>
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
                        </div>
                    )) : <div className={x2}><h4 style={{"margin" : "20px"}}>Gio hang rong</h4></div>}
                    <div className="cartitem__totalprice__forpayment">
                        <p>Here is summary price {carttotal}</p>
                        <div className="novel__btn__item">
                            <AddCartToUser user={location.state._id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCart