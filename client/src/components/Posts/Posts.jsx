import React from 'react'

import Post from './Post/Post'

import { CircularProgress, Grid } from '@material-ui/core'

import { useSelector } from 'react-redux'

const Posts = ({ setCurrentId, SetPopUp, setUpdatePopupText }) => {

    const {posts, isLoading} = useSelector((state) => state.posts) // []=>{posts:[]}

    // console.log("from here Posts.jsx:", posts);

    if(!posts.length && !isLoading) return ' No Posts'

    return (
        <>

            {isLoading ? <CircularProgress /> : (

                <>

                 <Grid container alignItems='stretch' spacing={3}>

                    {posts.map((post) => {

                        return (
                            <Grid item className="post-grid" lg={4} md={6} xs={12} sm={12} key={post._id}>


                                <div className="post-card" >

                                    <Post post={post} setCurrentId={setCurrentId} SetPopUp={SetPopUp} setUpdatePopupText={setUpdatePopupText} />

                                </div>
                            </Grid>
                            
                            )



                    })}


                 </Grid>


                </>
            )}





        </>
    )
}

export default Posts
