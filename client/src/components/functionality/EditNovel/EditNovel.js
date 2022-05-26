import React from 'react'
import { useState } from 'react';
import '../../contents/MainPage/MainPage.css'
import './EditNovel.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function EditNovel() {
    const [noveltitle, setTitle] = useState('');
    const [novelcontent, setContent] = useState('');
    const [authorname, setAuthorName] = useState('');
    const [novelImage, setNovelImage] = useState('');

    const location = useLocation();

    useEffect(() => {
        console.log("location of my novel", location)
    }, [])

    const onChangeFile = e => {
        setNovelImage(e.target.files[0]);
    }

    const changeOnClick = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("noveltitle", noveltitle);
        formData.append("novelcontent", novelcontent);
        formData.append("authorname", authorname);
        formData.append("novelImage", novelImage);

        setTitle('');
        setContent('');
        setAuthorName('');

        axios
            .put(`http://localhost:4000/novels/update/${location.state}`, formData)
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
                        <h1>Update Novel</h1>
                        <label htmlFor="title">Novel Title</label>
                        <input value={noveltitle} onChange={e => setTitle(e.target.value)} type="text" className='' placeholder="Novel's Title" />
                        <label htmlFor="content">Author</label>
                        <input value={authorname} onChange={e => setAuthorName(e.target.value)} type="text" className='' placeholder="Novel's Author" />
                        <label htmlFor="authorname">Content</label>
                        <textarea value={novelcontent} onChange={e => setContent(e.target.value)} className='' rows="3"></textarea>
                        <div className="form__group">
                            <label htmlFor='file'>Choose novel image</label>
                            <input onChange={onChangeFile} className='form__control__file' type="file" filename='novelImage' />
                        </div>

                        <button type="submit" >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditNovel