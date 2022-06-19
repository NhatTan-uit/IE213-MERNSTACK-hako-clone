import React, { useRef, useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../../DataLayer';
import { Link } from 'react-router-dom';

import './Login.css';

function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [{ user, allusers, novels, colortoggleState }, dispatch] = useDataLayerValue();

    const uname = useRef();
    const upass = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: 'SET_LOGGED_USER',
            user: null,
        });
        localStorage.removeItem('user');
        localStorage.removeItem('userrole');
    }, []);

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
                    if (res.data.user.usertype) {
                        localStorage.setItem('userrole', res.data.user.usertype)
                    }
                    alert(res.data.message)
                    navigate('/')
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                    alert("Sai ten dang nhap hoac mat khau")
                    uname.current.focus();
                });
        }
    }

    let x1 = '';

    if (colortoggleState) {
        x1 = 'mainpage__background__color__dark';
    }
    else {
        x1 = 'mainpage__background__color';
    }

    return (
        <div className={x1}>
            <div className='mainpage'>
                <div className='login'>
                    <div className='form-title'>
                        <h2>Login</h2>
                    </div>
                    <div className="add__form form-login">
                        <form onSubmit={changeOnClick} encType='multipart/form-data'>

                            <label htmlFor="username">Username</label>
                            <input ref={uname} onChange={e => setUserName(e.target.value)} type='text' className='' placeholder="Enter Your Username" />
                            <label htmlFor="userpass">Password</label>
                            <input ref={upass} onChange={e => setPassword(e.target.value)} type='password' className='' placeholder="Enter Your Password" />

                            <label>Doesn't have an account?
                                <Link
                                    style={{ "marginLeft": "15px", "textDecoration": "none", "color": "aqua" }}
                                    to='/register'>Register
                                </Link>
                            </label>

                            <button type="submit" >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login