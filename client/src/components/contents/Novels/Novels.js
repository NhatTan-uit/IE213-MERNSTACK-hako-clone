import React from 'react'
import { useDataLayerValue } from '../../../DataLayer'
import { Link } from 'react-router-dom';
import AddToCart from '../../functionality/NovelButton/AddToCart/AddToCart';


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
          <h4>{novel.novelprice}</h4>
          <div className="novel__btn__item">
            <AddToCart novel={novel} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Novels