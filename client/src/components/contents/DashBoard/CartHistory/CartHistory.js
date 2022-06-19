import React from 'react'
import { useLocation } from 'react-router-dom';
import ConfirmCartStatus from '../../../functionality/NovelButton/ConfirmCartStatus/ConfirmCartStatus';
import { useDataLayerValue } from '../../../../DataLayer';

function CartHistory() {
    const [{ colortoggleState }, dispatch] = useDataLayerValue();

    const location = useLocation();

    let x1 = '';
    let x2 = '';

    if (colortoggleState) {
        x1 = 'carthistory__body__container__dark';
        x2 = 'carthistory__container__dark';
    }
    else {
        x1 = 'carthistory__body__container';
        x2 = 'carthistory__container';
    }

    return (
        <div className={x2}>
            {location.state.user && !location.state.user.usertype && <h1>Lịch sử mua hàng</h1>}
            {location.state.user && location.state.user.usertype && <h1>Yêu cầu giao dịch từ người dùng</h1>}
            <div className='carthistory__body'>
                {location.state.user && !location.state.user.usertype && <h3>Giỏ hàng của tôi</h3>}
                {location.state.user && !location.state.user.usertype && location.state.user.cart.map((item1, key1) => (
                    <div className={x1} key={key1}>
                        <div className='carthistory__body__title'>
                            <h4>Cart id: {key1 + 1}</h4>
                            <h4>Tổng giá trị {item1.totalcartprice}</h4>
                            {item1.cartstatus ?
                                <h4>Tình trạng: Da thanh toan</h4>
                                :
                                <h4>Tình trạng: Chua thanh toan</h4>}
                        </div>

                        <div className='carthistory__body__body'>
                            {item1.usercart && item1.usercart.map((item2, key) => (
                                <div className='carthistory__body__body__item' key={key}>
                                    <img src={`/uploads/${item2.novelImage}`} alt='...' />
                                    <div className='carthistory__body__body__item__info'>
                                        <h4>{item2.noveltitle}</h4>
                                        <h4>Tác giả: {item2.authorname}</h4>
                                        <h4>Số lượng: {item2.quantity}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {location.state.user && location.state.user.usertype && location.state.allusers.map((item2, key2) => (
                    <div key={key2}>
                        {!item2.usertype && item2.cart.length !== 0 &&
                            <div>
                                <hr></hr>
                                <hr></hr>
                                <h4>Người dùng: {item2.username}</h4>
                                <hr></hr>
                                {item2.cart.length !== 0 && item2.cart.map((item3, key3) => (
                                    <div key={key3}>
                                        <hr></hr>
                                        Tổng giá trị giỏ hàng: {item3.totalcartprice}
                                        {item3.cartstatus ?
                                            <h4>Trạng thái giao dịch: Da thanh toan</h4>
                                            :
                                            <h4>Trạng thái giao dịch: Chua thanh toan</h4>}
                                        {item3.usercart.map((item4, key4) => (
                                            <div key={key4}>
                                                <i>Tựa truyện</i>: {item4.noveltitle}
                                                <br></br>
                                                <i>Giá thành</i>: {item4.novelprice}
                                                <br></br>
                                                <br></br>
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