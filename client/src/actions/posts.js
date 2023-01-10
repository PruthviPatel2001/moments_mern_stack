import * as api from '../api' // importing everytihing from api

import { actionTypes } from '../constants/actionTypes';

// Actions Creators

export const getSinglePost = (id) => async (dispatch) => { 
  
    try {

        
        dispatch({type:actionTypes.START_LOADING})

        const { data} = await api.fetchPost(id);


        dispatch({
            type: actionTypes.FETCH_POST,
            payload: {post:data}
        });

        dispatch({type:actionTypes.END_LOADING})


    } catch (error) {
        console.log("error in getPost action/posts.js : ", error);
    }


}

export const getPosts = (page) => async (dispatch) => { // for redux-think (async (dispatch ) having func in func)

    try {

        
        dispatch({type:actionTypes.START_LOADING})

        const { data} = await api.fetchPosts(page);

        // const action = {
        //     type:'FETCH_ALL',
        //     payload:[]
        // }


        dispatch({
            type: actionTypes.FETCH_ALL,
            payload: data
        });

        dispatch({type:actionTypes.END_LOADING})


    } catch (error) {
        console.log("error in getPosts action/posts.js : ", error);
    }


}

export const getPostBySearch = (searchQuery) => async(dispatch)=>{

    try {

        dispatch({type:actionTypes.START_LOADING})


        const { data:{data} }= await api.fetchPostBySearch(searchQuery);


        dispatch({
            type: actionTypes.FETCH_BY_SEARCH,
            payload: {data}
        });

        dispatch({type:actionTypes.END_LOADING})



        
    } catch (error) {

        console.log(error);
        
    }
}

export const createPost = (post,history) => async (dispatch) => {

    try {
        dispatch({type:actionTypes.START_LOADING})

        const { data } = await api.createPost(post);


        history.push(`/posts/${data._id}`)

        dispatch({ type: actionTypes.CREATE, payload: data })

        dispatch({type:actionTypes.END_LOADING})



    } catch (error) {
        console.log("error in createPost action/posts.js : ", error);

    }

}

export const updatePost = (id, post) => async (dispatch) => {

    try {

        dispatch({type:actionTypes.START_LOADING})


        const { data } = await api.updatePost(id, post);


        dispatch({ type: actionTypes.UPDATE, payload: data })

        dispatch({type:actionTypes.END_LOADING})


    } catch (error) {
        console.log("error in updatePost action/posts.js : ", error);

    }

}

export const deletePost = (id) => async (dispatch) => {

    try {

        await api.deletePost(id);

        dispatch({ type: actionTypes.DELETE, payload: id })



    } catch (error) {
        console.log("error in delete action/posts.js : ", error);

    }

}

export const likePost = (id) => async (dispatch) => {

    try {
        const { data } = await api.likePost(id);


        dispatch({ type: actionTypes.LIKE, payload: data })

    } catch (error) {
        console.log("error in updatePost action/posts.js : ", error);

    }
}

export const commentPost = (value,id)=> async(dispatch)=>{

    try {
        
       const {data} = await api.comment(value,id)

    //    console.log(data); // {comments : ['comment','comment2']}


       dispatch({type:actionTypes.COMMENT, payload:data})

       return data.comments

    } catch (error) {

        console.log(error);
        
    }
}