import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import './EditChapter.css';

function EditChapter() {
    const [chaptername, setChapterName] = useState('');
    const [chaptercontent, setChapterContent] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("location of my current chapter and novelid", location);
        if (location.state) {
            setChapterName(location.state.chap.chaptername);
            setChapterContent(location.state.chap.chaptercontent);
        }
    }, [])

    const changeOnClick = (e) => {
        e.preventDefault();

        const chapter = {
            chaptername,
            chaptercontent,
        };

        axios
            .put(`http://localhost:4000/novels/update/${location.state.novelid}/${location.state.chap._id}`, chapter)
            .then(res => {
                navigate('/')
            })
            .catch(err => {
                console.log(err);
            });
        
        alert("Chapter Updated Successfully!!")
    }

    return (
        <div className="edit-chapter">
            <div className='edit-chapter-title'>
                <h2>Edit Current Chapter</h2>
            </div>
            <div className="add__form form-edit-chapter">
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
  )
}

export default EditChapter