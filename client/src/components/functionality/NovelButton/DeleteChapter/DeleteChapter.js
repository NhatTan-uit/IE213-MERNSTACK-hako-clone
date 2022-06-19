import React from 'react'
import { Link } from 'react-router-dom';
import { useDataLayerValue } from '../../../../DataLayer';
import axios from 'axios'

function DeleteChapter({ chapter }) {
  const [{ novels }, dispatch] = useDataLayerValue();

  const handleRemove = () => {
    axios
      .put(`http://localhost:4000/novels/${chapter.novelid}/${chapter.chap._id}`)
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
      <button onClick={handleRemove}>
        <Link className='non__decorate__router__link' to="/redirect">Delete Current Chapter</Link>
      </button>
    </div>
  )
}

export default DeleteChapter