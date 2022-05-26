import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom';
import { useDataLayerValue } from '../../../../DataLayer'
import './DeleteNovel.css'

function DeleteNovel({ novel }) {
  const [{ novels }, dispatch] = useDataLayerValue();

  const handleRemove = () => {
    axios
      .delete(`http://localhost:4000/novels/${novel}`)
      .then(res => alert(res.data))
      .catch(err => {
        console.log(err);
      });

    axios
      .get('http://localhost:4000/novels')
      .then(res => dispatch({
        type: 'SET_NOVELS_LIST',
        novels: res.data
      }))
      .catch(err => console.log(err));
  }

  return (
    <div className='link'>
      <button onClick={handleRemove}><Link className='delete__link' to="/redirect">Delete Novel</Link></button>
    </div>
  )
}

export default DeleteNovel