import React from 'react'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../../../DataLayer'
import InsertNovel from '../../functionality/NovelButton/InsertNovel/InsertNovel'
import SideBarButton from '../MySideBar/SideBarButton/SideBarButton'
import PageModeToggle from '../PageModeToggle/PageModeToggle'
import './MyNavBar.css'


function MyNavBar() {
  const [{ colortoggleState }, dispatch] = useDataLayerValue();

  let x1 = '';

  if (colortoggleState) {
    x1 = 'mynavbar__background__color__dark';
  }
  else {
    x1 = 'mynavbar__background__color';
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
          <div className="nav__items">
            <InsertNovel />
          </div>
          <div className="nav__items">
            <Link className='media__hide__seeks' to="/c">Kuroc</Link>
          </div>
        </div>

        <div className="nav__search__bar">
          <button> search </button>
        </div>

        <div className="nav__toggle__button">
          <PageModeToggle />
        </div>

        <div className="nav__login__button">
          <button>Login</button>
        </div>
      </div>
    </div>
  )
}

export default MyNavBar