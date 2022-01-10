import React from 'react'

import Post from './Post/Post'

import {} from '@material-ui/core'

import { useSelector } from 'react-redux'

const Posts = () => {

    const posts = useSelector((state)=> state.posts)

    console.log("from Posts.jsx:", posts);

    return (
        <>
            
        <Post/>
        <Post/>
        <Post/>
        



        </>
    )
}

export default Posts
