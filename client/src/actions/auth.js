import * as api from '../api' // importing everytihing from api

import { actionTypes } from '../constants/actionTypes';

export const signin = (formData,history) => async(dispatch)=> {

   try {
    
    const {data} = await api.signIn(formData);

    dispatch({type:actionTypes.AUTH,data})

    history.push('/')

   } catch (error) {
       console.log(error);
       
       const errMsg =
       error.response && error.response.data.message
         ? error.response.data.message
         : error.message;

        dispatch({type:"ERROR",data:errMsg})
   }

}


export const signup = (formData,history) => async(dispatch)=> {

    try {
     
     const {data} = await api.signUp(formData);


    dispatch({type:actionTypes.AUTH,data})
 
     history.push('/')
 
    } catch (error) {
        console.log(error);
    }
 
 }