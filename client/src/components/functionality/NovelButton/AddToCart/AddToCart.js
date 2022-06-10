import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useDataLayerValue } from '../../../../DataLayer'
import { useNavigate } from 'react-router-dom';

function AddToCart({ novel }) {
    const [{ user, cart }, dispatch] = useDataLayerValue();

    const navigate = useNavigate();

    let isAddToCart = true;

    const handleAddToCart = () => {
        let checkIfExist = cart.map((item) => {
            if (item._id === novel._id) {
                return true;
            }
        });

        for (var i = 0; i <= checkIfExist.length; i++) {
            if (checkIfExist[i]) {
                isAddToCart = false;
                break;
            }
        }

        if (isAddToCart) {
            dispatch({
                type: 'SET_CART',
                cart: cart.concat(novel)
            });
            alert("Them vao gio hang thanh cong");
        }
        else {
            alert("Ban da them san pham nay vao gio hang roi!!");
            if (window.confirm("Ban co muon vao gio hang cua ban de dieu chinh so luong san pham va thuc hien thanh toan?")) {
                navigate('/dashboard', { state: user });
            };
        }
    }

    return (
        <div className='link'>
            <button onClick={handleAddToCart}>AddToCart</button>
        </div>
    )
}

export default AddToCart