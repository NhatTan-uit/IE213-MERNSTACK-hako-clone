import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddNewNovel() {
    const [noveltitle, setTitle] = useState('');
    const [novelcontent, setContent] = useState('');
    const [authorname, setAuthorName] = useState('');
    const [novelImage, setNovelImage] = useState('');
    const [novelprice, setNovelPrice] = useState('');

    const navigate = useNavigate();

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
        formData.append("novelprice", novelprice);

        axios
            .post("http://localhost:4000/novels/add", formData)
            .then(res => {
                navigate('/')
            })
            .catch(err => {
                console.log(err);
            });

        alert("Insert Successfully!!")
    }

    return (
        <div className="mainpage__background__color">
            <div className='mainpage'>
                <div className="add__form">
                    <form onSubmit={changeOnClick} encType='multipart/form-data'>
                        <h1>Add new Novels</h1>
                        <label htmlFor="title">Novel Title</label>
                        <input value={noveltitle ?? ""} onChange={e => setTitle(e.target.value)} type="text" className='' placeholder="Novel's Title" />
                        <label htmlFor="content">Author</label>
                        <input value={authorname ?? ""} onChange={e => setAuthorName(e.target.value)} type="text" className='' placeholder="Novel's Author" />
                        <label htmlFor="authorname">Content</label>
                        <textarea value={novelcontent ?? ""} onChange={e => setContent(e.target.value)} className='' rows="3"></textarea>
                        <div className="form__group">
                            <label htmlFor='file'>Choose novel image</label>
                            <input onChange={onChangeFile} className='form__control__file' type="file" filename='novelImage' />
                        </div>
                        <label htmlFor="price">Price</label>
                        <input value={novelprice ?? ""} onChange={e => setNovelPrice(e.target.value)} type="number" className='' placeholder="Novel's Price" />

                        <button type="submit" className=''>
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewNovel