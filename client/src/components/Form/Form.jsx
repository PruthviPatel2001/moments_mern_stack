import { Button, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { createPost, updatePost } from '../../actions/posts';
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux'

import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';

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


const Form = ({ currentId, setCurrentId,SetPopUp }) => {

    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()

    const [postData, SetPostData] = useState({
        // creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });


    const InputEvent = (event) => {

        const { name, value } = event.target

        SetPostData((prevData) => {

            return {
                ...prevData, [name]: value
            }
        })
    }

    const dispatch = useDispatch();

    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)


    const handelSubmit = (e) => {


        e.preventDefault();


        if (currentId) {
            dispatch(updatePost(currentId, {...postData,name:user?.result?.name}))
           

        } else {

            dispatch(createPost({...postData,name:user?.result?.name},history))

        }

        clear();
        SetPopUp(false);



    }

    const clear = () => {

        setCurrentId(null)
        SetPostData({
            // creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
        SetPopUp(false);



    }

    useEffect(() => {

        if (post) SetPostData(post);

    }, [post]);


    if(!user?.result?.name){
        return(
            <Paper>
                <Typography variant="h6" align="center">
                     please sign in to create post and like post.
                </Typography>
            </Paper>
        )
    }

    return (
        <>



            <form onSubmit={handelSubmit} className={`${classes.root} form-wrapper`}>

                <div className="item">

                    {/* <NewTextField
                        margin='dense' name="creator"
                        variant="outlined" label="Creator"
                        value={postData.creator} onChange={InputEvent}
                    /> */}

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
                        value={postData.tags} onChange={(e) => SetPostData({ ...postData, tags: e.target.value.split(',') })}
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

                    <Button className="btn-1" type="submit">
                        Submit
                    </Button>

                    <Button className="btn-2" onClick={clear}>
                        clear
                    </Button>

                </div>


            </form>




        </>
    )
}

export default Form
