import React from 'react'
import { useDataLayerValue } from '../../../../DataLayer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function AddCartToUser({ user }) {
    const [{ cart, carttotal }, dispatch] = useDataLayerValue();

    const navigation = useNavigate();

    const handleAddCartToUser = () => {
        if (window.confirm("Ban co chac muon thanh toan?")) {
            if (window.confirm("Mot khi thanh toan se khong duoc huy trang thai don hang")) {
                if (cart.length > 0) {
                    let check = true;

                    cart.forEach((item) => {
                        if (item.quantity === 0) {
                            check = false;
                        }
                    })

                    //check if any cart quantity is 0
                    if (check) {
                        const cartToUser = {
                            usercart: cart,
                            totalcartprice: carttotal,
                            cartstatus: false
                        };

                        axios
                            .post(`http://localhost:4000/user/addcart/${user}`, cartToUser)
                            .then(res => {
                                alert(res.data);
                                navigation('/');
                                dispatch({
                                    type: 'SET_CART',
                                    cart: []
                                })
                                dispatch({
                                    type: 'SET_CART_TOTAL_PRICE',
                                    carttotal: 0
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                    else {
                        alert("ERR: Khong the thanh toan");
                        alert("Vui lòng kiểm tra lại số lượng sản phẩm, nếu = 0 hãy xóa khỏi giỏ hàng");
                    }
                }
                else {
                    alert("ERR: Gio hang rong!!");
                }
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