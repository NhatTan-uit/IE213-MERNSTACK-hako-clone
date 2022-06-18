import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../../DataLayer';

import './AddNewNovel.css';

function AddNewNovel() {
    const [noveltitle, setTitle] = useState('');
    const [novelcontent, setContent] = useState('');
    const [authorname, setAuthorName] = useState('');
    const [novelImage, setNovelImage] = useState('');
    const [novelprice, setNovelPrice] = useState('');
    const [{ user, allusers, novels, colortoggleState }, dispatch] = useDataLayerValue();

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
                <div className="add-new-novel">
                    <div className='form-title'>
                        <h2>Add new Novels</h2>
                    </div>
                    <div className="add__form form-add-novel">
                        <form onSubmit={changeOnClick} encType='multipart/form-data'>
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
        </div>
    )
}

export default AddNewNovel