import React from 'react'
import { useDataLayerValue } from '../../../../DataLayer'
import axios from 'axios'

function AddCartToUser({ user }) {
    const [{ cart, carttotal }, dispatch] = useDataLayerValue();

    const handleAddCartToUser = () => {
        if (window.confirm("Ban co chac muon thanh toan?")) {
            if (cart.length > 0) {
                if (carttotal === 0) {
                    alert("ERR: Khong the thanh toan, so luong san pham = 0");
                }
                else {
                    const cartToUser = {
                        usercart: cart,
                        totalcartprice: carttotal
                    };

                    axios
                        .post(`http://localhost:4000/user/addcart/${user}`, cartToUser)
                        .then(res => {
                            alert(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
            else {
                alert("ERR: Gio hang rong!!");
            }
        }
    }

    return (
        <div className='link'>
            <button onClick={handleAddCartToUser}>Thanh toan</button>
        </div>
    )
}

export default AddCartToUser