import React from 'react'
import { useLocation } from 'react-router-dom'
import './NovelChapter.css'
import { useEffect } from 'react';
import '../MainPage/MainPage.css'
import UpdateChapter from '../../functionality/NovelButton/UpdateChapter/UpdateChapter';
import DeleteChapter from '../../functionality/NovelButton/DeleteChapter/DeleteChapter';

function NovelChapter() {
    const location = useLocation();

    useEffect(() => {
        console.log("location of my chapter", location)
    }, [])

    return (
        <div className="mainpage__background__color">
            <div className='mainpage'>
                <div className="read__novel">
                    <h1>{location.state.chap.chaptername}</h1>
                    <p>{location.state.chap.chaptercontent}</p>
                    <div className='chapter__button'>
                        <div className="chapter__button__item">
                            <UpdateChapter chapter={location.state}/>
                        </div>
                        <div className="chapter__button__item">
                            <DeleteChapter chapter={location.state}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovelChapter