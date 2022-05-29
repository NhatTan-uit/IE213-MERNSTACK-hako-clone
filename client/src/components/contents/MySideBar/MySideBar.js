import React from 'react'
import './MySideBar.css'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../../../DataLayer'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import InsertNovel from '../../functionality/NovelButton/InsertNovel/InsertNovel';

function MySideBar() {
    let x = 'mysidebar';
    const [ { user, sidebarState } , dispatch ] = useDataLayerValue();

    const sidebariconCLicked = () => {
        dispatch({
            type: 'SET_SIDEBARSTATE',
            sidebarState: false,
        })
    }

    if (sidebarState) {
        x = 'mysidebar__show';
    }
    else x = 'mysidebar';

    return (
        <div className={x}>
            <div className="sidebar__group">
                <Link className='sidebar__items' to="/a">Kuroa</Link>
                {user && user.usertype && <InsertNovel />}
                <Link className='sidebar__items' to="/c">Kuroc</Link>
            </div>
            <ArrowCircleLeftIcon onClick={sidebariconCLicked} fontSize='large' className='sidebar__icon' />
        </div>
    )
}

export default MySideBar