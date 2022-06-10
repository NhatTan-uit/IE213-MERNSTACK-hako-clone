import React from 'react'
import { Link } from 'react-router-dom'

function UpdateNovel({ novel }) {
  return (
    <div className='link'>
      <button>
        <Link state={novel} className='non__decorate__router__link' to={`/update/${novel._id}`}>Update Novel</Link>
      </button>
    </div>
  )
}

export default UpdateNovel