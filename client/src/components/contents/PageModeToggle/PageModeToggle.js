import React from 'react'
import { useDataLayerValue } from '../../../DataLayer';
import './PageModeToggle.css'

function PageModeToggle() {
    const [{ colortoggleState }, dispatch] = useDataLayerValue();

    const handletoggleChange = () => {
        if (colortoggleState) {
            dispatch({
                type: 'SET_COLORTOGGLE',
                colortoggleState: false,
            });
        }
        else {
            dispatch({
                type: 'SET_COLORTOGGLE',
                colortoggleState: true,
            });
        }
    }

    return (
        <div className='switch'>
            <input checked={colortoggleState} type='checkbox' />
            <div onClick={handletoggleChange} className='slider'></div>
        </div>
    )
}

export default PageModeToggle