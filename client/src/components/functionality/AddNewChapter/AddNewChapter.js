import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../../DataLayer'

import './AddNewChapter.css';


function AddNewChapter() {
    const [chaptername, setChapterName] = useState('');
    const [chaptercontent, setChapterContent] = useState('');
    const [{ user, allusers, novels, colortoggleState }, dispatch] = useDataLayerValue();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("location of my current novel", location)
    }, [])

    const changeOnClick = (e) => {
        e.preventDefault();

        const chapter = {
            chaptername,
            chaptercontent,
        };

        axios
            .post(`http://localhost:4000/novels/add/${location.state}`, chapter)
            .then(res => {
                navigate('/')
            })
            .catch(err => {
                console.log(err);
            });

        alert("Insert Chapter Succesfully!!")
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
                <div className="add-new-chapter">
                    <div className='form-title'>
                    <h2>Insert New Chapter</h2>
                    </div>
                    <div className="add__form form-add-new-chapter">
                        <form onSubmit={changeOnClick} encType='multipart/form-data'>
                            <label htmlFor="chaptername">Chapter Name</label>
                            <input value={chaptername ?? ""} onChange={e => setChapterName(e.target.value)} type="text" className='' placeholder="Chapter's Title" />
                            <label htmlFor="chaptercontent">Content</label>
                            <textarea value={chaptercontent ?? ""} onChange={e => setChapterContent(e.target.value)} className='' rows="3"></textarea>
                            <button type="submit" >
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewChapter