import React, { useState } from 'react'
import { useDataLayerValue } from '../../../DataLayer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserChangePass() {
    const [{ user }, dispatch] = useDataLayerValue();
    const [currentpw, setCurrentPw] = useState("");
    const [newpw, setNewPw] = useState("");
    const [confirmpw, setConfirmPw] = useState("");

    const navigate = useNavigate();

    const changePassword = () => {
        if (currentpw !== '' || newpw !== '' || confirmpw !== '') {
            if (user.password === currentpw) {
                if (newpw === confirmpw) {
                    const pw = {
                        password: newpw
                    }

                    axios
                        .put(`http://localhost:4000/user/changepassword/${user._id}`, pw)
                        .then(res => {
                            dispatch({
                                type: 'SET_LOGGED_USER',
                                user: null,
                            });
                            localStorage.removeItem('user');
                            alert(res.data)
                            alert("Logout succesfully");
                            navigate('/authentication');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                else alert("Vui long xac nhan lai mat khau moi")
            }
            else alert("Mat khau hien tai khong dung");
        }
        else alert("Vui lòng nhập đủ thông tin")
    }

    return (
        <div>
            <div className="change__password">
                <h3>Thay đổi mật khẩu</h3>
                <br></br>
                <label>Nhập mật khẩu hiện tại</label>
                <input type="password" onChange={e => setCurrentPw(e.target.value)} style={{ padding: '10px' }}></input>
                <br></br>
                <label>Xác nhận lại mật khẩu</label>
                <input type="password" onChange={e => setNewPw(e.target.value)} style={{ padding: '10px' }}></input>
                <br></br>
                <label>Nhập mật khẩu mới</label>
                <input type="password" onChange={e => setConfirmPw(e.target.value)} style={{ padding: '10px' }}></input>
                <br></br>
                <div className="novel__btn__item">
                    <div className='link'>
                        <button onClick={changePassword}>Đổi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserChangePass