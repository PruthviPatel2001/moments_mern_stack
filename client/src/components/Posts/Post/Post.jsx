import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';

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

const Post = () => {

    const classes = useStyles();
    const update = ()=>{
        console.log("hello");
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    className="card-Header"
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={

                        <Menu style={{backgroundColor:'red'}} menuButton={
                            <MenuButton style={{backgroundColor:'red'}}>
                                <IconButton aria-label="settings">
                                    <MoreVertIcon className="icon" />
                                </IconButton>
                            </MenuButton>}>
                            <MenuItem onClick={update}>Update</MenuItem>
                            <MenuItem>Delete</MenuItem>
                           
                            
                        </Menu>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                />
                <CardContent className="card-content">
                    <Typography variant="body2" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>



                </CardActions>

            </Card>
        </div>
    )
}

export default Post
