import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Paper, Typography, CircularProgress, Divider, Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import { getSinglePost, getPostBySearch, getPosts } from '../../actions/posts';
import CommentSection from './CommentSection';


const useStyles = makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '80%',
        maxHeight: '600px',

    },
    recommendedMedia: {

        height: 0,
        paddingTop: '56.25%', // 16:9

    },
    card: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },
    section: {
        borderRadius: '20px',
        margin: '10px',
        // marginLeft:'1rem',
        flex: 1,

       
    },
    imageSection: {
        // marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    recommendedPosts: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
    },
}));

const PostDetails = () => {

    const { post, posts, isLoading } = useSelector((state) => state.posts)

    const classes = useStyles()

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {

        dispatch(getSinglePost(id))

    }, [id])

    useEffect(() => {

        if (post) {
            dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }))
        }

    }, [post])


    if (!post) return null;

    if (isLoading) {
        return (
            <Paper className="loader">

                <CircularProgress size="3em" />

            </Paper>
        )
    }


    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

    const openPost = (_id) => {
        history.push(`/posts/${_id}`)
    }


    return (
        <>
            <Paper style={{marginTop:'1rem', padding: '20px', borderRadius: '15px'}} >
                <div className={classes.card}>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                    </div>
                    <div className={classes.section}>
                        <Typography variant="h3" component="h2">{post.title}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                        <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                        <Typography gutterBottom variant="body1" component="p">{post.likes.length > 1 ? `${post.likes.length} likes`:`${post.likes.length} like`}  </Typography>

                        <Typography variant="h6">Created by: {post.name}</Typography>
                        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <CommentSection post={post} />
                            <Divider style={{ margin: '20px 0' }} />
                    </div>
                </div>

                {recommendedPosts.length > 0 && (

                    <div className='recommended-section'>
                        <Typography gutterBottom variant='h5' component='h5'>

                            You Might also Like:

                        </Typography>
                        <Divider />
                        <div className="recommended-post">
                            <Grid container alignItems='stretch' spacing={3}>
                                {recommendedPosts.map((post) => {

                                    const { title, message, name, creator, likes, selectedFile, _id, createdAt } = post

                                    return (
                                        <Grid item style={{marginTop:'1rem'}} lg={3} md={4} xs={12} sm={12} key={_id}>

                                            <Card className="card-body">


                                                <CardHeader
                                                    className="card-Header"
                                                    avatar={
                                                        <Avatar aria-label="recipe" >
                                                            {/* {firstLetters} */}
                                                        </Avatar>
                                                    }

                                                    title={name ? name : creator}
                                                    subheader={moment(createdAt).fromNow()}
                                                />
                                                <CardMedia className={classes.recommendedMedia} image={selectedFile} />
                                                {/* <ButtonBase className='card-btn' style={{border:'1px solid red'}} onClick={openPost}> */}


                                                <CardContent className="card-content">

                                                    <Typography variant="h6" component="h6">
                                                        {title},
                                                    </Typography>

                                                    <Typography variant="body2" component="p">
                                                        {message}
                                                    </Typography>



                                                </CardContent>

                                                {/* </ButtonBase> */}

                                                <CardActions disableSpacing style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>


                                                    <IconButton >
                                                        <FavoriteIcon /> {likes.length}
                                                    </IconButton>

                                                    <IconButton onClick={() => openPost(_id)}>

                                                        <ArrowRightAltIcon />

                                                    </IconButton>

                                                </CardActions>

                                            </Card>

                                        </Grid>

                                    )

                                })}
                            </Grid>
                        </div>
                    </div>

                )}
            </Paper >
        </>
    );
};

export default PostDetails;
