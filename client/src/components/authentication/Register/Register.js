import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../../DataLayer'

import './Register.css'

function Register() {
    const [errmessage, setErrMessage] = useState('');
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setConfirmPassword] = useState('');
    const [{ user, allusers, novels, colortoggleState }, dispatch] = useDataLayerValue();

    const navigate = useNavigate();

    const changeOnClick = (e) => {
        e.preventDefault();

        if (name === '' || username === '' || password === '' || cpassword === '') {
            alert("Vui lòng nhập đầy đủ thông tin");
        }
        else {
            if (password === cpassword) {
                const user = {
                    name,
                    username,
                    password
                };

                axios
                    .post(`http://localhost:4000/user/register/`, user)
                    .then(res => {
                        if (res.data === "User is already existed") {
                            alert(res.data)
                            setErrMessage("Please change Your Name or Username")
                        }
                        else {
                            alert(res.data)
                            navigate('/authentication')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                alert("Wrong confirm password");
                setErrMessage("Please check your confirm password")
            }
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
                <div className="register">
                    <div className='form-title'>
                        <h2>Register</h2>
                    </div>
                    <div className="add__form form-register">
                        <form onSubmit={changeOnClick} encType='multipart/form-data'>
                            <p style={{ color: 'red' }}>{errmessage}</p>
                            <label htmlFor="name">Your Name</label>
                            <input onChange={e => setName(e.target.value)} type='text' className='' placeholder="Enter Your Name" />
                            <label htmlFor="username">Username</label>
                            <input onChange={e => setUserName(e.target.value)} type='text' className='' placeholder="Enter Your Username" />
                            <label htmlFor="userpass">Password</label>
                            <input onChange={e => setPassword(e.target.value)} type='password' className='' placeholder="Enter Your Password" />
                            <label htmlFor="confirmpass">Confirm Password</label>
                            <input onChange={e => setConfirmPassword(e.target.value)} type='password' className='' placeholder="Confirm Your Password" />
                            <button type="submit" className='register-button' >
                                Register
                            </button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Register