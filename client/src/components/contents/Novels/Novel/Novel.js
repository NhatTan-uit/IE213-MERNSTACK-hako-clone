import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import UpdateNovel from '../../../functionality/NovelButton/UpdateNovel/UpdateNovel'
import DeleteNovel from '../../../functionality/NovelButton/DeleteNovel/DeleteNovel'
import { Link } from 'react-router-dom'
import InsertChapter from '../../../functionality/NovelButton/InsertChapter/InsertChapter'
import { useDataLayerValue } from '../../../../DataLayer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Novel() {
    const [{ user }] = useDataLayerValue();
    const [comment, setComment] = useState('');

    const navigate = useNavigate();

    let x = 'novel__btn__nonuser';
    if (user) {
        if (user.usertype) {
            x = 'novel__btn';
        }
        else x = 'novel__btn__nonuser'
    }
    else x = 'novel__btn__nonuser'

    const location = useLocation();

    const changeOnClick = (e) => {
        e.preventDefault();

        const usercomment = {
            userid: user._id,
            usercomment: comment
        }

        if (comment !== '') {
            axios
                .post(`http://localhost:4000/novels/add/comment/${location.state._id}`, usercomment)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });

            alert("Comment Posted Succesfully!!")
        }
        else {
            alert("Vui lòng nhập bình luận trước khi gửi");
        }
    }

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
                    <div className={x} >
                        <div className='novel__btn__item'>
                            <InsertChapter novel={location.state._id} />
                        </div>
                        <div className='novel__btn__item'>
                            <UpdateNovel novel={location.state} />
                        </div>
                        <div className='novel__btn__item'>
                            <DeleteNovel novel={location.state._id} />
                        </div>
                    </div>
                </div>
                <div className='comment__novel'>
                    {!user && <p style={{ "alignSelf": "flex-start", "margin": "10px" }}>Vui lòng <Link to='/authentication'>đăng nhập</Link> hoặc <Link to='/register'>đăng ký</Link> để sử dụng chức năng này</p>}
                    <form onSubmit={changeOnClick} encType='multipart/form-data' className='comment__novel__form'>
                        {user && <label>Chào bạn {user.username}</label>}

                        <textarea value={comment ?? ""} onChange={e => setComment(e.target.value)} rows="5"></textarea>

                        {user && <button type="submit">Send</button>}
                    </form>

                    {location.state && location.state.comments && location.state.comments.slice(0).reverse().map((comment, key2) => (
                        <div className='comment__novel__user__comments' key={key2}>
                            <h4>{comment.userid}</h4>
                            <p>{comment.usercomment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Novel