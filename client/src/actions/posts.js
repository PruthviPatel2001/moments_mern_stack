import * as api from '../api' // importing everytihing from api


// Actions Creators

export const getPosts = () => async (dispatch) =>{ // for redux-think (async (dispatch ) having func in func)

    try {

        const {data} = await api.fetchPosts();

        // const action = {
        //     type:'FETCH_ALL',
        //     payload:[]
        // }

         dispatch ({
            type:'FETCH_ALL',
            payload:data
        });
    } catch (error) {
        console.log("error in getPosts action/posts.js : ",error);
    }
 

}

export const createPost = (post) => async(dispatch) =>{

    try {

        const {data} = await api.createPost(post);

        console.log("datat action file:", data);

        dispatch({type:'CREATE', payload:data})

        
    } catch (error) {
        console.log("error in createPost action/posts.js : ",error);
        
    }

}