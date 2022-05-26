import React from 'react'
import './AddNewChapter.css'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function AddNewChapter() {
    const [chaptername, setChapterName] = useState('');
    const [chaptercontent, setChapterContent] = useState('');

    const location = useLocation();

    useEffect(() => {
        console.log("location of my current novel", location)
    }, [])

    const changeOnClick = (e) => {
        e.preventDefault();

        const chapter = {
            chaptername,
            chaptercontent,
        };

        setChapterName('');
        setChapterContent('');

        axios
            .post(`http://localhost:4000/novels/add/${location.state}`, chapter)
            .then(res => alert(res.data))
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="mainpage__background__color">
            <div className='mainpage'>
                <div className="add__form">
                    <form onSubmit={changeOnClick} encType='multipart/form-data'>
                        <h1>Insert New Chapter</h1>
                        <label htmlFor="chaptername">Chapter Name</label>
                        <input value={chaptername} onChange={e => setChapterName(e.target.value)} type="text" className='' placeholder="Chapter's Title" />
                        <label htmlFor="chaptercontent">Content</label>
                        <textarea value={chaptercontent} onChange={e => setChapterContent(e.target.value)} className='' rows="3"></textarea>
                        <button type="submit" >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewChapter