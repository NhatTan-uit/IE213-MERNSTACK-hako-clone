import React from 'react'
import { useDataLayerValue } from '../../../DataLayer';

function RecentlyComments() {
    const [{ novels }, dispatch] = useDataLayerValue();

    console.log("recent", novels);

    return (
        <div className="mainpage__recently__comment">
            {novels.map((novel, key1) => (
                <div className='recently__comment__container' key={key1}>
                    {novel.comments && novel.comments.slice(0).reverse().map((comment, key2) => (
                        <div className='recently__comment__item' key={key2}>
                            <h4>{comment.crrusername}</h4>
                            <p>{comment.usercomment}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default RecentlyComments