import React from 'react'
import { useDataLayerValue } from '../../../../DataLayer'
import { useNavigate } from 'react-router-dom';

function AddToCart({ novel }) {
    const [{ user, cart, carttotal }, dispatch] = useDataLayerValue();

    const navigate = useNavigate();

    let isAddToCart = true;

    const handleAddToCart = () => {
        if (user) {
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
                const cartitem = {
                    _id: novel._id,
                    noveltitle: novel.noveltitle,
                    novelcontent: novel.novelcontent,
                    novelImage: novel.novelImage,
                    authorname: novel.authorname,
                    novelprice: novel.novelprice,
                    quantity: 1,
                    totalprice: novel.novelprice,
                }

                dispatch({
                    type: 'SET_CART',
                    cart: cart.concat(cartitem)
                });
                dispatch({
                    type: 'SET_CART_TOTAL_PRICE',
                    carttotal: carttotal + novel.novelprice
                })
                alert("Them vao gio hang thanh cong");
            }
            else {
                alert("Ban da them san pham nay vao gio hang roi!!");
                if (window.confirm("Ban co muon vao gio hang cua ban de dieu chinh so luong san pham va thuc hien thanh toan?")) {
                    navigate('/cart', { state: user });
                };
            }
        }
        else {
            alert("Bạn phải đăng nhập để sử dụng chức năng này")
        }
    }

    return (
        <div className='link'>
            <button onClick={handleAddToCart}>AddToCart</button>
        </div>
    )
}

export default AddToCart