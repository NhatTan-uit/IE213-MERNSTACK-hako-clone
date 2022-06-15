import React, { useRef } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../../DataLayer';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [{ user }, dispatch] = useDataLayerValue();

    const uname = useRef();
    const upass = useRef();

    const navigate = useNavigate();

    const changeOnClick = (e) => {
        e.preventDefault();

        if (username === '') {
            alert("Vui long dien ten dang nhap");
            uname.current.focus();
        }
        else if (password === '') {
            alert("Vui long dien mat khau");
            upass.current.focus();
        }
        else {
            const user = {
                username,
                password
            };

            axios
                .post(`http://localhost:4000/user/login/`, user)
                .then(res => {
                    dispatch({
                        type: 'SET_LOGGED_USER',
                        user: res.data.user
                    })
                    localStorage.setItem('user', res.data.user._id)
                    alert(res.data.message)
                    navigate('/')
                })
                .catch(err => {
                    console.log(err);
                    alert("Sai ten dang nhap hoac mat khau")
                    uname.current.focus();
                });
        }
    }

    return (
        <div className="mainpage__background__color">
            <div className='mainpage'>
                <div className="add__form">
                    <form onSubmit={changeOnClick} encType='multipart/form-data'>
                        <h1>Login</h1>
                        <label htmlFor="username">Username</label>
                        <input ref={uname} onChange={e => setUserName(e.target.value)} type='text' className='' placeholder="Enter Your Username" />
                        <label htmlFor="userpass">Password</label>
                        <input ref={upass} onChange={e => setPassword(e.target.value)} type='password' className='' placeholder="Enter Your Password" />

                        <label>Doesn't have an account? <Link to='/register'>Register</Link></label>

                        <button type="submit" >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login