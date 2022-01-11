export default (posts = [], action) => {

  switch (action.type) {

    case 'FETCH_ALL':
      return action.payload;

    case 'CREATE':
      console.log("reducer", action.payload);
      return [...posts, action.payload]

    case 'UPDATE':
      console.log("reducer post id update", action.payload._id);

      return posts.map((post)=>post._id === action.payload._id ? action.payload  :  post)

    case 'DELETE':  
    console.log("reducer post id update", action.payload);
    return posts.filter((post)=>post._id !== action.payload)

    case 'LIKE':
      console.log("reducer post id update", action.payload._id);

      return posts.map((post)=>post._id === action.payload._id ? action.payload  :  post)


    default:
      return posts;

  }

}