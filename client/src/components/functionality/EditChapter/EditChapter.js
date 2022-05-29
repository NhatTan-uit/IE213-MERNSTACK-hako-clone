import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function EditChapter() {
    const [chaptername, setChapterName] = useState('');
    const [chaptercontent, setChapterContent] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("location of my current chapter and novelid", location)
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
            .put(`http://localhost:4000/novels/update/${location.state.novelid}/${location.state.chap._id}`, chapter)
            .then(res => {
                alert(res.data)
                navigate('/')
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="mainpage__background__color">
            <div className='mainpage'>
                <div className="add__form">
                    <form onSubmit={changeOnClick} encType='multipart/form-data'>
                        <h1>Edit Current Chapter</h1>
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

export default EditChapter