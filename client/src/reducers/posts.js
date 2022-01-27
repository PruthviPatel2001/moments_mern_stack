import { actionTypes } from "../constants/actionTypes";

export default (state = { isLoading:true , posts:[] }, action) => {

  switch (action.type) {

    case actionTypes.START_LOADING:
      return{...state, isLoading:true}

    case actionTypes.END_LOADING:
      return{...state, isLoading:false}


    case actionTypes.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages

      }

    case actionTypes.FETCH_POST: // for single post
      return { ...state , post: action.payload.post };


    case actionTypes.FETCH_BY_SEARCH:
      return { ...state ,  posts: action.payload.data  };

    case actionTypes.CREATE:

      console.log("reducer", action.payload);
      return {...state, posts : [...state.posts, action.payload] }

    case actionTypes.UPDATE:

      console.log("reducer post id update", action.payload._id);


      return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}

    case actionTypes.DELETE:

      console.log("reducer post id update", action.payload);
      return {...state , posts: state.posts.filter((post) => post._id !== action.payload)}

    case actionTypes.LIKE:

      console.log("reducer post id update", action.payload._id);

      return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}


    default:
      return state;

  }

}