import React from 'react'
import { Link } from 'react-router-dom'

function UpdateChapter({ chapter }) {
  return (
    <div className='link'>
      <button>
        <Link state={chapter} className='non__decorate__router__link' to={`/update/${chapter.novelid}/${chapter.chap._id}`}>Update Chapter</Link>
      </button>
    </div>
  )
}

export default UpdateChapter