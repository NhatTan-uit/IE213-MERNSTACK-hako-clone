import React from 'react'
import { Link } from 'react-router-dom'

function UpdateNovel( { novel } ) {
  return (
    <div>
        <Link state={novel} className='link' to={`/update/${novel._id}`}>Update Novel</Link>
    </div>
  )
}

export default UpdateNovel