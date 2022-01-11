import React from 'react'

import Post from './Post/Post'

import { CircularProgress } from '@material-ui/core'

import { useSelector } from 'react-redux'

const Posts = ({setCurrentId,SetPopUp,setUpdatePopupText}) => {

    const posts = useSelector((state) => state.posts)

    console.log("from here Posts.jsx:", posts);

    return (
        <>

            {!posts.length ? <CircularProgress /> : (

                <>
                    {posts.map((post) => {

                        return (

                            <div className="post-card" key={post._id}>

                                <Post post={post} setCurrentId={setCurrentId} SetPopUp={SetPopUp} setUpdatePopupText={setUpdatePopupText} />

                            </div>
                        )


                    })}


                </>
            )}





        </>
    )
}

export default Posts
