import React, { useState } from 'react'

import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import FileBase from 'react-file-base64';

import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/posts';

const NewTextField = withStyles({
    root: {
      
        "& label.Mui-focused": {
            color: "#FFACB7"
          },
  
      "& .MuiOutlinedInput-root": {
       
        "&:hover fieldset": {
          borderColor: "#FFACB7"
        },
  
        "&.Mui-focused fieldset": {
          borderColor: "#FFACB7",
          
        },

      },
     
    }
  })(TextField);
  

  const useStyles = makeStyles((theme) => ({
    root: {
     
    },
 
  }));
  

const Form = () => {

    const classes = useStyles();

    const [postData, SetPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    // console.log("postData from form.jsx", postData);

    const InputEvent = (event) => {

        const { name, value } = event.target

        SetPostData((prevData) => {

            return {
                ...prevData, [name]: value
            }
        })
    }

    const dispatch = useDispatch();

    const handelSubmit = (e) => {


        e.preventDefault();

        console.log("inside handelSubmit postData from form.jsx", postData);


        dispatch(createPost(postData))

    }

    const clear = () => {

    }

    return (
        <>



            <form   onSubmit={handelSubmit} className={`${classes.root} form-wrapper`}>

                <div className="item">

                    <NewTextField
                        margin='dense' name="creator"
                        variant="outlined" label="Creator"
                        value={postData.creator} onChange={InputEvent}
                    />

                    <NewTextField
                        margin='dense' name="title"
                        variant="outlined" label="Title"
                        value={postData.title} onChange={InputEvent}
                    />

                </div>
                <div className="item">

                    <NewTextField
                        margin='dense' name="message"
                        variant="outlined" label="Message"
                        value={postData.message} onChange={InputEvent}
                    />

                    <NewTextField
                        margin='dense' name="tags"
                        variant="outlined" label="Tags"
                        value={postData.tags} onChange={InputEvent}
                    />

                </div>




                <div className="file-input item">

                    <FileBase

                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => SetPostData({ ...postData, selectedFile: base64 })}

                    />

                </div>

                <div className="item">

                    <Button  className="btn-1" type="submit">
                        Submit
                    </Button>

                    <Button  className="btn-2" onClick={clear}>
                        clear
                    </Button>

                </div>


            </form>




        </>
    )
}

export default Form
