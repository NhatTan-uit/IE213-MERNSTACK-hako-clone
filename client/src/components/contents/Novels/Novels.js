import React from 'react'
import { useDataLayerValue } from '../../../DataLayer'
import { Link } from 'react-router-dom';
import './Novels.css'


function Novels() {
  const [{ novels }, dispatch] = useDataLayerValue();

  return (
    <div>
      {novels.map((novel, key) => (
        <div className='novel__container' key={key}>
          <img src={`/uploads/${novel.novelImage}`} alt='...' />
          <Link state={novel} to={{
            pathname: `/novels/${novel._id}`
          }}>
            <h4>{novel.noveltitle}</h4>
          </Link>
          <h4>{novel.authorname}</h4>
        </div>
      ))}
    </div>
  )
}

export default Novels