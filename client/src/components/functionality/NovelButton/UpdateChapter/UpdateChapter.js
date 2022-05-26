import React from 'react'
import './UpdateChapter.css'
import { Link } from 'react-router-dom'

function UpdateChapter({ chapter }) {
  return (
    <div>
      <Link state={chapter} className='link' to={`/update/${chapter.novelid}/${chapter.chap._id}`}>Update Chapter</Link>
    </div>
  )
}

export default UpdateChapter