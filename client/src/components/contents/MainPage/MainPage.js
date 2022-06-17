import React from 'react'
import axios from 'axios';
import { useLayoutEffect } from 'react';
import { useDataLayerValue } from '../../../DataLayer'
import Novels from '../Novels/Novels'

function MainPage() {
  const [{ user, allusers, novels }, dispatch] = useDataLayerValue();

  const userid = localStorage.getItem('user');

  useLayoutEffect(() => {
    axios
      .get('http://localhost:4000/novels')
      .then(res => dispatch({
        type: 'SET_NOVELS_LIST',
        novels: res.data
      }))
      .catch(err => console.log(err));
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
  }, []);

  return (
    <div className="mainpage__background__color">
      <div className='mainpage'>
        <div className="mainpage__container">
          <div className="mainpage__col__big">
            <div className='mainpage__novel'>
              <Novels />
            </div>
          </div>
          <div className="mainpage__col__small">
            <p>Im small col</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage