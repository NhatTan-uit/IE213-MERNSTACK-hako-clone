import React from 'react'
import { useDataLayerValue } from '../../../../DataLayer'

function SideBarButton() {
    const [{ sidebarState, colortoggleState }, dispatch] = useDataLayerValue();

    let x1 = '';

    if (colortoggleState) {
        x1 = 'sidebarbutton__dark';
    }
    else {
        x1 = 'sidebarbutton';
    }

    const sidebarbuttonCLicked = () => {
        dispatch({
            type: 'SET_SIDEBARSTATE',
            sidebarState: true,
        })
    }

    return (
        <div className={x1}>
            <button onClick={sidebarbuttonCLicked}>Side</button>
        </div>
    )
}

export default SideBarButton