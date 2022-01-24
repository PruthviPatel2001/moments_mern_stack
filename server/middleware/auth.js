import jwt from 'jsonwebtoken';

const auth = async (req,res,next)=>{

    try {
        
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500; // if len id lower than 500 its our own token or its a google token

        let decodedData;

        if(token && isCustomAuth){

            decodedData= jwt.verify(token, 'test');

            req.userId= decodedData?.id; // to know which user is login

        }else{ // block for sign in using google oauth
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //sub is google id differentiate every single user


        }

        next()


    } catch (error) {
        console.log(error);
    }
}

export default auth;