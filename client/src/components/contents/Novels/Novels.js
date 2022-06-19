import React from 'react'
import { useDataLayerValue } from '../../../DataLayer'
import { Link } from 'react-router-dom';
import AddToCart from '../../functionality/NovelButton/AddToCart/AddToCart';


function Novels() {
  const [{ novels }, dispatch] = useDataLayerValue();

  const userrole = localStorage.getItem('userrole');

  return (
    <div className='mainpage__novel'>
      {novels.map((novel, key) => (
        <div key={key}>
          <div className='novel__container'>
            <img src={`/uploads/${novel.novelImage}`} alt='...' />

            <Link className='header__style novel__title' state={novel} to={{
              pathname: `/novels/${novel._id}`
            }}>
              <h4>{novel.noveltitle}</h4>
            </Link>

            <div className='novel__gradient'></div>
          </div>

          <div className='novel__cart__container'>
            <h4 style={{ "fontSize": "16px" }}>Thành tiền: {novel.novelprice}</h4>
            {!userrole && <div className="novel__btn__item">
              <AddToCart novel={novel} />
            </div>}
          </div>

        </div>
      ))}
    </div>
  )
}

export default Novels