import React, { useState } from 'react'
import { useDataLayerValue } from '../../../DataLayer';
import './PageModeToggle.css'

function PageModeToggle() {
    const [{ colortoggleState }, dispatch] = useDataLayerValue();
    const [togglestate, setToggleState] = useState();

    console.log(togglestate);

    const handletoggleChange = () => {
        if (colortoggleState) {
            dispatch({
                type: 'SET_COLORTOGGLE',
                colortoggleState: false,
            });
            localStorage.setItem('pagecolor', 'light');
        }
        else {
            dispatch({
                type: 'SET_COLORTOGGLE',
                colortoggleState: true,
            });
            localStorage.setItem('pagecolor', 'dark');
        }
    }

    return (
        <div className='switch'>
            <input onChange={(e) => setToggleState(e.target.value)} checked={colortoggleState} type='checkbox' />
            <div onClick={handletoggleChange} className='slider'></div>
        </div>
    )
}

export default PageModeToggle