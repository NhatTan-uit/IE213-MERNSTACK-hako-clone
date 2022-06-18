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
    const userid = localStorage.getItem('user');

    const [{ user, allusers, colortoggleState }] = useDataLayerValue();
    const [comment, setComment] = useState('');

    const navigate = useNavigate();

    let x1 = '';
    let x2 = '';
    let x3 = '';

    if (colortoggleState) {
        x1 = 'mainpage__background__color__dark';
        x2 = 'read__novel__dark';
        x3 = 'read__novel__form__dark';
    }
    else {
        x1 = 'mainpage__background__color';
        x2 = 'read__novel';
        x3 = 'read__novel__form';
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
    console.log("test", location)

    const getCrrUser = (crruserid) => {
        if (userid === crruserid) {
            axios.get(`http://localhost:4000/user/${userid}`)
                .then(res => {
                    navigate('/dashboard', { state: { user: res.data, allusers: allusers } });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            axios.get(`http://localhost:4000/user/tocomment/${crruserid}`)
                .then(res => {
                    navigate('/dashboard', { state: { user: res.data, info: true } });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const changeOnClick = (e) => {
        e.preventDefault();

        const usercomment = {
            userid: user._id,
            crrusername: user.name,
            crruserImg: user.userImage,
            usercomment: comment
        }

        if (comment !== '') {
            axios
                .post(`http://localhost:4000/novels/add/comment/${location.state._id}`, usercomment)
                .then(res => {

                    alert("Comment Posted Succesfully!!")
                    navigate('/');
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            alert("Vui lòng nhập bình luận trước khi gửi");
        }
    }

    return (
        <div className={x1}>
            <div className='mainpage'>
                <div className='mainpage__header__img__shadow'></div>
                {colortoggleState ?
                    <div className='mainpage__header__img'>
                        <img src={`/uploads/Dark-theme.png`} alt='' />
                    </div>
                    :
                    <div className='mainpage__header__img'>
                        <img src={`/uploads/Light-theme.png`} alt='' />
                    </div>
                }

                <div className={x2}>
                    <div className='read__novel__image'>
                        <img src={`/uploads/${location.state.novelImage}`} alt='...' />
                    </div>

                    <div className='read__novel__info'>
                        <h1>{location.state.noveltitle}</h1>
                        <h3>Nội dung: </h3>
                        <p>{location.state.novelcontent}</p>
                        <h3>Tác giả: </h3>
                        <p>{location.state.authorname}</p>
                    </div>
                </div>

                <div className={x3}>
                    <div className='read__novel__form__header'>
                        <h4>List of Chapter</h4>
                    </div>

                    <div className='read__novel__form__body'>
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
                        {user && <label>Chào bạn {user.name}</label>}

                        <textarea value={comment ?? ""} onChange={e => setComment(e.target.value)} rows="5"></textarea>

                        {user && <button type="submit">Send</button>}
                    </form>

                    {location.state && location.state.comments && location.state.comments.slice(0).reverse().map((comment, key2) => (
                        <div className='comment__novel__user__comments' key={key2}>
                            {comment.crruserImg ?
                                <img
                                    style={{ "height": "30px", "width": "30px", "borderRadius": "50%" }}
                                    src={`/uploads/${comment.crruserImg}`}
                                    alt='...'
                                />
                                :
                                <img
                                    style={{ "height": "30px", "width": "30px", "borderRadius": "50%" }}
                                    src={`/uploads/nonuser.png`}
                                    alt='...'
                                />}

                            <a
                                onClick={() => getCrrUser(comment.userid)}
                                style={{ "cursor": "pointer", "color": "black", "textDecoration": "none" }}
                                to='/dashboard'>
                                <h4>{comment.crrusername}</h4>
                            </a>
                            <p>{comment.usercomment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Novel