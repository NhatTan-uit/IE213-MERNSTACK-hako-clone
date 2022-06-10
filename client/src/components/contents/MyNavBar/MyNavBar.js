import React from 'react'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../../../DataLayer'
import MySearchBar from '../../functionality/MySearchBar/MySearchBar'
import InsertNovel from '../../functionality/NovelButton/InsertNovel/InsertNovel'
import SideBarButton from '../MySideBar/SideBarButton/SideBarButton'
import PageModeToggle from '../PageModeToggle/PageModeToggle'


function MyNavBar() {
  const [{ user, colortoggleState }, dispatch] = useDataLayerValue();

  let x1 = '';

  if (colortoggleState) {
    x1 = 'mynavbar__background__color__dark';
  }
  else {
    x1 = 'mynavbar__background__color';
  }

  const onClicked = () => {
    dispatch({
      type: 'SET_LOGGED_USER',
      user: null,
    });
    localStorage.removeItem('user');
    alert("Logout succesfully");
  }

  return (
    <div className={x1}>
      <div className='mynavbar'>
        <div className='nav__sidebar__button'>
          <SideBarButton />
        </div>

        <div className="nav__logo__img">
          <Link to="/">
            <img src='' alt='' />
          </Link>
        </div>

        <div className="mynavbar__links__items">
          <div className="nav__items">
            <Link className='media__hide__seeks' to="/a">Kuroa</Link>
          </div>
          {user && user.usertype && <div className="nav__items">
            <InsertNovel />
          </div>}
          <div className="nav__items">
            <Link className='media__hide__seeks' to="/c">Kuroc</Link>
          </div>
        </div>

        <div className="nav__search__bar">
          <MySearchBar />
        </div>

        <div className="nav__toggle__button">
          <PageModeToggle />
        </div>

        {user && <div className='nav__user__name'>
          <Link state={user} to='/dashboard'>{user.name}</Link>
        </div>}

        <div className="nav__login__button">
          {user ?
            <a href='/' onClick={onClicked} className='login__button__link'>Logout</a>
            : <Link to='/authentication' className='login__button__link'>Login</Link>}
        </div>
      </div>
    </div>
  )
}

export default MyNavBar