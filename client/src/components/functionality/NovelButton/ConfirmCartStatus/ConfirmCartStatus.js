import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ConfirmCartStatus({ cartstate }) {
    const navigation = useNavigate();

    const handleConfirmCart = () => {
        if (window.confirm("Bạn có chắc chắn xác nhận đơn hàng?")) {
            if (window.confirm("Một khi xác nhận sẽ không thể hoàn tác!!")) {
                const confirmstatus = {
                    cartstatus: true
                }

                axios
                    .put(`http://localhost:4000/user/admin/cart/update/${cartstate.userid}/${cartstate.cartid}`, confirmstatus)
                    .then(res => {
                    })
                    .catch(err => {
                        console.log(err);
                    });

                alert("Thanh toan thanh cong");
                navigation('/');
                window.location.reload();
            }
        }
    }
    return (
        <div className='link'>
            <button onClick={handleConfirmCart}>Confirm User Cart</button>
        </div>
    )
}

export default ConfirmCartStatus