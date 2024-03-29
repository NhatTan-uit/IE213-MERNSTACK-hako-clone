import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDataLayerValue } from '../../../DataLayer'

import './EditNovel.css';

function EditNovel() {
    const [noveltitle, setTitle] = useState('');
    const [novelcontent, setContent] = useState('');
    const [authorname, setAuthorName] = useState('');
    const [novelImage, setNovelImage] = useState('');
    const [novelprice, setNovelPrice] = useState('');
    const [{ user, allusers, novels, colortoggleState }, dispatch] = useDataLayerValue();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("location of my novel", location);
        if (location.state) {
            setTitle(location.state.noveltitle);
            setContent(location.state.novelcontent);
            setAuthorName(location.state.authorname);
            setNovelPrice(location.state.novelprice);
        }
    }, []);

    const onChangeFile = e => {
        setNovelImage(e.target.files[0]);
    };

    const changeOnClick = (e) => {
        if (novelImage === '') {
            e.preventDefault();
            alert("Vui lòng chọn hình ảnh")
        }
        else {
            e.preventDefault();

            const formData = new FormData();
    
            formData.append("noveltitle", noveltitle);
            formData.append("novelcontent", novelcontent);
            formData.append("authorname", authorname);
            formData.append("novelImage", novelImage);
            formData.append("novelprice", novelprice);
    
            axios
                .put(`http://localhost:4000/novels/update/${location.state._id}`, formData)
                .then(res => {
                    navigate('/')
                })
                .catch(err => {
                    console.log(err);
                });
    
            alert("Updated Successfully!!");
        }
    };

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
                <div className="edit-novel">
                    <div className='form-title'>
                        <h2>Update Novel</h2>
                    </div>
                    <div className="add__form form-edit-novel">
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

export default EditNovel