import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Novel.css'
import '../MainPage/MainPage.css'
import UpdateNovel from '../../functionality/NovelButton/UpdateNovel/UpdateNovel'
import DeleteNovel from '../../functionality/NovelButton/DeleteNovel/DeleteNovel'
import { Link } from 'react-router-dom'
import InsertChapter from '../../functionality/NovelButton/InsertChapter/InsertChapter'

function Novel() {
    const location = useLocation();

    useEffect(() => {
        console.log("location of my novel", location)
    }, [])

    return (
        <div className="mainpage__background__color">
            <div className='mainpage'>
                <div className="read__novel">
                    <img src={`/uploads/${location.state.novelImage}`} alt='...' />
                    <h1>{location.state.noveltitle}</h1>
                    <p>{location.state.novelcontent}</p>
                    <h1>{location.state.authorname}</h1>
                    <div>
                        <h4>List of Chapter</h4>
                        {location.state.chapter.map((chap, key) => (
                            <div className='chapter__list__container' key={key}>
                                <Link state={{ chap: chap, novelid: location.state._id }} to={{
                                    pathname: `/novels/${location.state._id}/${chap._id}`
                                }}>{chap.chaptername}</Link>
                            </div>
                        ))}
                    </div>
                    <div className="novel__btn">
                        <div className='novel__btn__item'>
                            <InsertChapter novel={location.state._id} />
                        </div>
                        <div className='novel__btn__item'>
                            <UpdateNovel novel={location.state._id} />
                        </div>
                        <div className='novel__btn__item'>
                            <DeleteNovel novel={location.state._id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Novel