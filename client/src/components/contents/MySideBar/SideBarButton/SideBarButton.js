import React from 'react'
import { useDataLayerValue } from '../../../../DataLayer'

function SideBarButton() {
    const [{ sidebarState }, dispatch] = useDataLayerValue();

    const sidebarbuttonCLicked = () => {
        dispatch({
            type: 'SET_SIDEBARSTATE',
            sidebarState: true,
        })
    }

    return (
        <div className='sidebarbutton'>
            <button onClick={sidebarbuttonCLicked}>Side</button>
        </div>
    )
}

export default SideBarButton