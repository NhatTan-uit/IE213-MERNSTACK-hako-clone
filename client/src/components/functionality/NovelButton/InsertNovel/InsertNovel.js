import React from 'react'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../../../../DataLayer'

function InsertNovel() {
  let x = 'media__hide__seeks'
  const [ { sidebarState } , dispatch ] = useDataLayerValue();

  if (sidebarState){
    x = 'sidebar__items'
  }
  else x = 'media__hide__seeks'

  return (
    <div>
        <Link className={x} to="/add">Insert Novel</Link>
    </div>
  )
}

export default InsertNovel