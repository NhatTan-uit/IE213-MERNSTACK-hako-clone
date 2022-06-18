import React from 'react'
import axios from 'axios';
import { useLayoutEffect } from 'react';
import { useDataLayerValue } from '../../../DataLayer'
import Novels from '../Novels/Novels'
import RecentlyComments from '../RecentlyComments/RecentlyComments';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function MainPage() {
  const [{ user, allusers, novels, colortoggleState }, dispatch] = useDataLayerValue();

  const userid = localStorage.getItem('user');

  let x1 = '';

  if (colortoggleState) {
    x1 = 'mainpage__background__color__dark';
  }
  else {
    x1 = 'mainpage__background__color';
  }

  useLayoutEffect(() => {
    axios
      .get('http://localhost:4000/novels')
      .then(res => dispatch({
        type: 'SET_NOVELS_LIST',
        novels: res.data
      }))
      .catch(err => console.log(err));

    if (userid) {
      axios.get(`http://localhost:4000/user/${userid}`)
        .then(res => {
          dispatch({
            type: 'SET_LOGGED_USER',
            user: res.data
          })
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

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

        <div className="mainpage__container">
          <div className="mainpage__col__big">
            <div className='mainpage__col__title'>
              <EmojiEventsIcon
                style={{ "color": "yellow", "marginRight": "7px" }}
              />
              Nổi bật
            </div>
            <Novels />
          </div>
          <div className="mainpage__col__small">
            <div className='mainpage__col__title'>Thảo luận</div>
            <RecentlyComments />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage