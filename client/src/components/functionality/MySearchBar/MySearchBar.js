import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function MySearchBar() {
    return (
        <div className='my__search'>
            <div className="search__input">
                <input type="search"/>
            </div>
            <div className="search__item">
                <SearchIcon />
            </div>
        </div>
    )
}

export default MySearchBar