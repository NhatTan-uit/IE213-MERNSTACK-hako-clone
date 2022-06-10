import React from 'react'
import { Link } from 'react-router-dom'

function InsertChapter({ novel }) {
  return (
    <div className='link'>
      <button>
        <Link className='non__decorate__router__link' state={novel} to={`/add/${novel}`}>Insert Chapter</Link>
      </button>
    </div>
  )
}

export default InsertChapter