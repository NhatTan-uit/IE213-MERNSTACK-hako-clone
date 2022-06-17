import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../../../DataLayer'
import MySearchBar from '../../functionality/MySearchBar/MySearchBar'
import InsertNovel from '../../functionality/NovelButton/InsertNovel/InsertNovel'
import SideBarButton from '../MySideBar/SideBarButton/SideBarButton'
import PageModeToggle from '../PageModeToggle/PageModeToggle'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


function MyNavBar() {
  const [{ user, cart, colortoggleState, filterData }, dispatch] = useDataLayerValue();
  const [userdropdown, setUserDropDown] = useState('nav__user__dropdown__hide');

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
    localStorage.removeItem('userrole');
    alert("Logout succesfully");
    setUserDropDown('nav__user__dropdown__hide');
  }

  return (
    <div className={x1}>
      <div className='mynavbar'>
        <div className='nav__sidebar__button'>
          <SideBarButton />
        </div>

        <div className="nav__logo__img">
          <Link onClick={() => {
            // navigate to home, set search data to 0
            dispatch({
              type: 'SET_FILTER_DATA',
              filterData: []
            })
          }} to="/">
            <img src='' alt='' />
          </Link>
        </div>

        <div className="mynavbar__links__items">
          {user && user.usertype && <div className="nav__items">
            <InsertNovel />
          </div>}
          {user && !user.usertype && <div className="nav__cart__number">
            <Link state={user} className='nav__cart__number__link' to="/cart">
              <div className="cart__number">
                {cart.length}
              </div>
              <ShoppingCartOutlinedIcon />
            </Link>
          </div>}
        </div>

        <div className="nav__search__bar">
          <MySearchBar />
        </div>

        <div className="nav__toggle__button">
          <PageModeToggle />
        </div>

        {user && user.userImage &&
          <div
            onClick={() => {
              if (userdropdown === 'nav__user__dropdown__hide')
                setUserDropDown('nav__user__dropdown')
              else setUserDropDown('nav__user__dropdown__hide')
            }}
            className='nav__user__image'>
            <img
              style={{ "cursor": "pointer", "height": "30px", "width": "30px", "borderRadius": "50%" }}
              src={`/uploads/${user.userImage}`}
              alt='...'
            />
          </div>}

        {user && !user.userImage &&
          <div
            onClick={() => {
              if (userdropdown === 'nav__user__dropdown__hide')
                setUserDropDown('nav__user__dropdown')
              else setUserDropDown('nav__user__dropdown__hide')
            }}
            className='nav__user__image'>
            <img
              style={{ "cursor": "pointer", "height": "30px", "width": "30px", "borderRadius": "50%" }}
              src={`/uploads/nonuser.png`}
              alt='...'
            />
          </div>}

        <div className="nav__login__button">
          {!user && <Link to='/authentication' className='login__button__link'>Login</Link>}
        </div>

        <div className={userdropdown}>
          <div className='nav__user__name'>
            <Link
              onClick={() => setUserDropDown('nav__user__dropdown__hide')}
              state={user}
              to='/dashboard'>
              My profile
            </Link>
          </div>
          <div className="nav__login__button">
            {user && <a href='/' onClick={onClicked} className='login__button__link'>Logout</a>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyNavBar