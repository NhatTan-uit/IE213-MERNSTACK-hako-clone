import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
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
                    <div className='novel__btn'>
                        <div className="novel__btn__item">
                            <UpdateChapter chapter={location.state}/>
                        </div>
                        <div className="novel__btn__item">
                            <DeleteChapter chapter={location.state}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovelChapter