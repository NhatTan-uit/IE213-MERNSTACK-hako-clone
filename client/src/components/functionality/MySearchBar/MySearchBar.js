import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useDataLayerValue } from '../../../DataLayer';
import { Link } from 'react-router-dom';

function MySearchBar() {
    const [{ novels }, dispatch] = useDataLayerValue();

    const [filterData, setFilterData] = useState([]);

    const handleFilter = (e) => {
        const userSearchResult = e.target.value;
        const filter = novels.filter((novel) => {
            return novel.noveltitle.toLowerCase().includes(userSearchResult.toLowerCase());
        });

        if (userSearchResult === "") {
            setFilterData([]);
        } else setFilterData(filter);
    };

    const handleSearchInDatabase = () => {
        alert("hello")
    }

    return (
        <div className='my__search'>
            <div className="search__input">
                <input
                    style={{ "width": "100%", "borderRadius": "12px", "padding": "5px 13px", "border": "0.2px solid grey" }}
                    type="text"
                    placeholder="Enter Novel's Name"
                    onChange={handleFilter}
                />
            </div>
            <div className="search__icon">
                <SearchIcon
                    style={{ "cursor": "pointer", "fontSize": "20px", "position": "absolute", "right": "6", "top": "3" }}
                    onClick={handleSearchInDatabase}
                />
            </div>
            {filterData.length !== 0 && (
                <div className="search__item">
                    {filterData.map((novel, key) => (
                        <div className='search__novel__item' key={key}>
                            <Link state={novel} to={{
                                pathname: `/novels/${novel._id}`
                            }}>
                                <h4>{novel.noveltitle}</h4>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MySearchBar