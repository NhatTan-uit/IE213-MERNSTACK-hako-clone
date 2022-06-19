import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import UpdateChapter from '../../../../functionality/NovelButton/UpdateChapter/UpdateChapter';
import DeleteChapter from '../../../../functionality/NovelButton/DeleteChapter/DeleteChapter';
import { useDataLayerValue } from '../../../../../DataLayer';

function NovelChapter() {
    const [{ user, colortoggleState }] = useDataLayerValue();

    let x1 = '';
    let x2 = '';

    if (colortoggleState) {
        x1 = 'mainpage__background__color__dark';
        x2 = 'read__novel__chapter__dark';
    }
    else {
        x1 = 'mainpage__background__color';
        x2 = 'read__novel__chapter';
    }

    let x = 'novel__btn__nonuser';
    if (user) {
        if (user.usertype) {
            x = 'novel__btn';
        }
        else x = 'novel__btn__nonuser'
    }
    else x = 'novel__btn__nonuser'

    const location = useLocation();

    useEffect(() => {
        console.log("location of my chapter", location)
    }, [])

    return (
        <div className={x1}>
            <div className='mainpage'>
                <div className={x2}>
                    <h1>{location.state.chap.chaptername}</h1>
                    <p>{location.state.chap.chaptercontent}</p>
                    <div className={x}>
                        <div className="novel__btn__item">
                            <UpdateChapter chapter={location.state} />
                        </div>
                        <div className="novel__btn__item">
                            <DeleteChapter chapter={location.state} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovelChapter