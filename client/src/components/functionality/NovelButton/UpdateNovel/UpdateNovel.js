import React from 'react'
import { Link } from 'react-router-dom'
import './UpdateNovel.css'

function UpdateNovel( { novel } ) {
  return (
    <div>
        <Link state={novel} className='link' to={`/update/${novel}`}>Update Novel</Link>
    </div>
  )
}

export default UpdateNovel