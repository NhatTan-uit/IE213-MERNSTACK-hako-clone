import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [errmessage, setErrMessage] = useState('');
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setConfirmPassword] = useState('');

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

    return (
        <div className="mainpage__background__color">
            <div className='mainpage'>
                <div className="add__form">
                    <form onSubmit={changeOnClick} encType='multipart/form-data'>
                        <h1>Register</h1>
                        <p style={{ color: 'red' }}>{errmessage}</p>
                        <label htmlFor="name">Your Name</label>
                        <input onChange={e => setName(e.target.value)} type='text' className='' placeholder="Enter Your Name" />
                        <label htmlFor="username">Username</label>
                        <input onChange={e => setUserName(e.target.value)} type='text' className='' placeholder="Enter Your Username" />
                        <label htmlFor="userpass">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type='password' className='' placeholder="Enter Your Password" />
                        <label htmlFor="confirmpass">Confirm Password</label>
                        <input onChange={e => setConfirmPassword(e.target.value)} type='password' className='' placeholder="Confirm Your Password" />

                        <button type="submit" >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register