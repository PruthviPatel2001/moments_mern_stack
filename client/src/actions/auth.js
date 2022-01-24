import { actionTypes } from '../constants/actionTypes';
import * as api from '../api' // importing everytihing from api


export const signin = (formData,history) => async(dispatch)=> {

   try {
    
    const {data} = await api.signIn(formData);
    const response = await api.signIn(formData);


    console.log("auth.js in action folder here:",response);

    dispatch({type:actionTypes.AUTH,data})

    history.push('/')

   } catch (error) {
       console.log(error);
   }

}


export const signup = (formData,history) => async(dispatch)=> {

    try {
     
     // const {data} 
     console.log("make it till here");
     const {data} = await api.signUp(formData);

    console.log("auth.js in action folder:",data);

    dispatch({type:actionTypes.AUTH,data})
 
     history.push('/')
 
    } catch (error) {
        console.log(error);
    }
 
 }