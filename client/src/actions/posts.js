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

export const updatePost = (id,post) => async(dispatch) =>{

    try {

        console.log("post id (action file):", id);
        const {data} = await api.updatePost(id,post);


        dispatch({type:'UPDATE', payload:data})

        
    } catch (error) {
        console.log("error in updatePost action/posts.js : ",error);
        
    }

}