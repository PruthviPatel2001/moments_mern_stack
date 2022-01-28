import React, { useState, useRef, useEffect } from 'react';

import { Typography, TextField, Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {

    const [comments, setcomments] = useState(post?.comments);
    const [comment, setcomment] = useState('');
    const dispatch = useDispatch()
    const commentsRef = useRef()

    const user = JSON.parse(localStorage.getItem('profile'))


    const handelClick = async () => {

        const finalComment = `${user.result.name}: ${comment}`

        const newComment = await dispatch(commentPost(finalComment, post._id))

        setcomments(newComment)

        setcomment('')

        commentsRef.current.scrollIntoView({ behavior: 'smooth' })

    }

    

    return (
        <>

            <div className="comment-container">

                <div>

                    <Typography gutterBottom variant="h6">Commnets</Typography>
                    <div className="comments-inner-container">


                        {comments.map((c, i) => {

                            return (
                                <Typography className='ow'>
                                    <strong>{c.split(': ')[0]}</strong>
                                    {c.split(':')[1]}
                                </Typography>

                            )
                                

                        })}

                        <div ref={commentsRef} />
                    </div>
                </div>


                {user?.result?.name && (

                    <div style={{ width: '20rem' }}>

                        <Typography gutterBottom variant="h6" >

                            Write a Comment

                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            label="comments"
                            variant="outlined"
                            multiline
                            value={comment}
                            onChange={(e) => setcomment(e.target.value)}
                        />
                        <Button style={{ marginTop: '1rem' }} fullWidth
                            disabled={!comment} variant='contained'
                            onClick={handelClick} className='btn'
                        >

                            comment

                        </Button>

                    </div>

                )}


            </div>

        </>
    );
};

export default CommentSection;
