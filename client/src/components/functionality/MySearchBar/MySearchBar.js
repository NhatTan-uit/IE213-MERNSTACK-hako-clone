import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useDataLayerValue } from '../../../DataLayer';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom'

function MySearchBar() {
    const location = useLocation();

    const [{ novels, filterData }, dispatch] = useDataLayerValue();

    const [searchResult, setSearchResult] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    const searchWord = searchParams.get('noveltitle') || '';

    useEffect(() => {
        if (searchWord !== '') {
            setSearchResult(searchWord);

            const searchingjson = {
                searchResult: searchWord
            };

            console.log(searchingjson)

            axios
                .post(`http://localhost:4000/novels/search`, searchingjson)
                .then(res => {
                    if (res.data.length !== 0) {
                        dispatch({
                            type: 'SET_NOVELS_LIST',
                            novels: res.data
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [searchWord]);

    const handleFilter = (e) => {
        //search engine work only for / direction
        if (location.pathname === '/') {
            const userSearchResult = e.target.value;

            const filter = novels.filter((novel) => {
                return novel.noveltitle.toLowerCase().includes(userSearchResult.toLowerCase());
            });

            if (userSearchResult === "") {
                dispatch({
                    type: 'SET_FILTER_DATA',
                    filterData: []
                })
                setSearchParams({});
                setSearchResult('');
            } else {
                dispatch({
                    type: 'SET_FILTER_DATA',
                    filterData: filter
                })
                setSearchParams({ noveltitle: userSearchResult });
                setSearchResult(userSearchResult);
            }
        }
    };

    /* search comfirm (pressing search icon) */
    const handleSearchInDatabase = () => {
        if (searchResult !== '') {
            const searchjson = {
                searchResult
            };

            axios
                .post(`http://localhost:4000/novels/search`, searchjson)
                .then(res => {
                    if (res.data.length !== 0) {
                        dispatch({
                            type: 'SET_NOVELS_LIST',
                            novels: res.data
                        })
                    } else {
                        alert("Khong tim thay!!!");
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            dispatch({
                type: 'SET_FILTER_DATA',
                filterData: []
            })
        }
        else {
            axios
                .get('http://localhost:4000/novels')
                .then(res => dispatch({
                    type: 'SET_NOVELS_LIST',
                    novels: res.data
                }))
                .catch(err => console.log(err));
        }
    }

    /* search comfirm (pressing enter) */
    const handleSearchInDatabaseEnter = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (searchResult !== '') {
                const searchjson = {
                    searchResult
                };

                axios
                    .post(`http://localhost:4000/novels/search`, searchjson)
                    .then(res => {
                        if (res.data.length !== 0) {
                            dispatch({
                                type: 'SET_NOVELS_LIST',
                                novels: res.data
                            })
                        } else {
                            alert("Khong tim thay!!!");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });

                dispatch({
                    type: 'SET_FILTER_DATA',
                    filterData: []
                })
            }
            else {
                axios
                    .get('http://localhost:4000/novels')
                    .then(res => dispatch({
                        type: 'SET_NOVELS_LIST',
                        novels: res.data
                    }))
                    .catch(err => console.log(err));
            }
        }
    }

    return (
        <div className='my__search'>
            <div className="search__input">
                <input
                    style={{ "width": "100%", "borderRadius": "12px", "padding": "5px 13px", "border": "0.2px solid grey" }}
                    type="text"
                    placeholder="Enter Novel's Name"
                    onChange={handleFilter}
                    onKeyPress={handleSearchInDatabaseEnter}
                    value={searchWord}
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
                            <Link
                                state={novel}
                                to={{
                                    pathname: `/novels/${novel._id}`
                                }}
                                onClick={() => { dispatch({
                                    type: 'SET_FILTER_DATA',
                                    filterData: []
                                })}}
                            >
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