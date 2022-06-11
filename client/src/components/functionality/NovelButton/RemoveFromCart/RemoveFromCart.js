import React from 'react'
import { useDataLayerValue } from '../../../../DataLayer'

function RemoveFromCart({ cartitem }) {
    const [{ cart, carttotal }, dispatch] = useDataLayerValue();

    const handleRemoveFromCart = () => {
        dispatch({
            type: "SET_CART_TOTAL_PRICE",
            carttotal: Number((carttotal - cartitem.totalprice).toFixed(2))
        });
        dispatch({
            type: 'SET_CART',
            cart: cart.filter(item => item._id !== cartitem._id)
        });
        alert("Xoa khoi gio hang thanh cong");
    }

    return (
        <div className='link'>
            <button onClick={handleRemoveFromCart}>Remove from cart</button>
        </div>
    )
}

export default RemoveFromCart