import * as api from '../api' // importing everytihing from api
import { actionTypes } from '../constants/actionTypes';

// Actions Creators

export const getPosts = () => async (dispatch) => { // for redux-think (async (dispatch ) having func in func)

    try {

        const { data } = await api.fetchPosts();

        // const action = {
        //     type:'FETCH_ALL',
        //     payload:[]
        // }

        dispatch({
            type: actionTypes.FETCH_ALL,
            payload: data
        });
    } catch (error) {
        console.log("error in getPosts action/posts.js : ", error);
    }


}

export const createPost = (post) => async (dispatch) => {

    try {

        const { data } = await api.createPost(post);

        console.log("datat action file:", data);

        dispatch({ type: actionTypes.CREATE, payload: data })


    } catch (error) {
        console.log("error in createPost action/posts.js : ", error);

    }

}

export const updatePost = (id, post) => async (dispatch) => {

    try {

        console.log("post id (action file):", id,post);
        const { data } = await api.updatePost(id, post);


        dispatch({ type: actionTypes.UPDATE, payload: data })


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