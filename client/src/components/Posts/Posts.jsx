import { CircularProgress, Grid, Typography } from '@material-ui/core'

import Post from './Post/Post'
import React from 'react'
import { useSelector } from 'react-redux'

const Posts = ({ setCurrentId, SetPopUp, setUpdatePopupText }) => {

    const { posts, isLoading } = useSelector((state) => state.posts) // []=>{posts:[]}


    if (!posts.length && !isLoading) {

        return (

            <div className='loader'>
                <Typography variant="h5" component='5'>
                    No Post available!!
                </Typography>
            </div>

        )
    }

    return (
        <>

            {isLoading ?


                <div className="loader">

                    <CircularProgress size="3em" />
                </div>



                : (

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
