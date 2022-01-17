import React from 'react'

import Post from './Post/Post'

import { CircularProgress, Grid } from '@material-ui/core'

import { useSelector } from 'react-redux'

const Posts = ({ setCurrentId, SetPopUp, setUpdatePopupText }) => {

    const posts = useSelector((state) => state.posts)

    console.log("from here Posts.jsx:", posts);

    return (
        <>

            {!posts.length ? <CircularProgress /> : (

                <>
                    {posts.map((post) => {

                        return (
                            <Grid item className="post-grid" lg={4} md={4} xs={12} sm={12}>


                                <div className="post-card" key={post._id}>

                                    <Post post={post} setCurrentId={setCurrentId} SetPopUp={SetPopUp} setUpdatePopupText={setUpdatePopupText} />

                                </div>
                            </Grid>
                                )



                    })}


                </>
            )}





        </>
    )
}

export default Posts
