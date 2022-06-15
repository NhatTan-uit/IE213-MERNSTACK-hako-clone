import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../../../DataLayer'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MySearchBar from '../../functionality/MySearchBar/MySearchBar'
import InsertNovel from '../../functionality/NovelButton/InsertNovel/InsertNovel';
import PageModeToggle from '../PageModeToggle/PageModeToggle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function MySideBar() {
    let x = 'mysidebar';
    const [{ user, cart, sidebarState, colortoggleState }, dispatch] = useDataLayerValue();

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
                <div className="sidebar__items">
                    <MySearchBar />
                </div>
                {user && <Link className='sidebar__items' to="/cart">Cart History</Link>}
                {user && user.usertype && <InsertNovel />}
                {user && <Link state={user} className='sidebar__items' to="/dashboard">
                    <div className="cart__number">
                        {cart.length}
                    </div>
                    <ShoppingCartOutlinedIcon />
                </Link>}

                <div className="sidebar__items">
                    {colortoggleState ?
                        <p>Switch to light?</p>
                        : <p>Switch to dark?</p>}
                    <PageModeToggle />
                </div>
            </div>
            <ArrowCircleLeftIcon style={{ "cursor": "pointer", "fontSize": "30px" }} onClick={sidebariconCLicked} className='sidebar__icon' />
        </div>
    )
}

export default MySideBar