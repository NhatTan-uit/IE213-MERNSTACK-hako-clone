import React from 'react'
import { Link } from 'react-router-dom'

function InsertChapter( {novel} ) {
  return (
    <div>
        <Link state={novel} className='link' to={`/add/${novel}`}>Insert Chapter</Link>
    </div>
  )
}

export default InsertChapter