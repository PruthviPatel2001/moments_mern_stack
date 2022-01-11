import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';

import {useDispatch} from 'react-redux';
import { deletePost,likePost } from '../../../actions/posts';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginTop: "1.5rem",


    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const Post = ({ post,setCurrentId,SetPopUp,setUpdatePopupText }) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    

    const upDateData=()=>{

        console.log("on click of update button:",post._id);

        setCurrentId(post._id)

        SetPopUp(true)
        setUpdatePopupText(true)


        // console.log("hello post");
    }

    const Namefirst2 = post.creator.split(' ').slice(0, 2).join(' ');
    const firstLetters = post.creator
    .split(' ')
    .map(word => word[0])
    .join('');

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    className="card-Header"
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {firstLetters}
                        </Avatar>
                    }
                    action={

                        <Menu style={{ backgroundColor: 'red' }} menuButton={
                            <MenuButton style={{ backgroundColor: 'red' }}>
                                <IconButton aria-label="settings">
                                    <MoreVertIcon className="icon" />
                                </IconButton>
                            </MenuButton>}>
                            {/* <MenuItem onClick={()=>setCurrentId(post._id)}>Update</MenuItem> */}
                            <MenuItem onClick={ upDateData}>Update</MenuItem>

                            <MenuItem onClick={()=>dispatch(deletePost(post._id))}>Delete</MenuItem>


                        </Menu>
                    }
                    title={post.creator}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    className={classes.media}
                    image={post.selectedFile}
                    title="Paella dish"
                />
                <CardContent className="card-content">
                    <Typography variant="h6" component="h6">
                        {post.title},
                    </Typography>
                    <Typography variant="body2" component="p">
                        {post.message}
                    </Typography>
                    <Typography variant="body2" component="p">
                         {console.log( post.tags.map((tag)=> `#${tag}`))}
                         {post.tags.map((tag)=> `#${tag}`)}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={()=>dispatch(likePost(post._id))}>
                        <FavoriteIcon  /> {post.likeCount}
                    </IconButton>



                </CardActions>

            </Card>
        </div>
    )
}

export default Post
