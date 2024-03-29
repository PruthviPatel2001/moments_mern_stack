import '@szhsin/react-menu/dist/core.css';

import { Avatar, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core';
import { Menu, MenuButton, MenuItem, SubMenu } from '@szhsin/react-menu';
import React,{useState} from 'react'
import { deletePost, likePost } from '../../../actions/posts';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        // marginTop: "1.5rem",
        // minWidth:344


    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));


const Post = ({ post, setCurrentId, SetPopUp, setUpdatePopupText }) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const [likes, setlikes] = useState(post?.likes);



    const upDateData = () => {


        setCurrentId(post._id)

        SetPopUp(true)
        setUpdatePopupText(true)


    }


    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = user?.result.googleId || user?.result?._id

    const haslikedPost =  post.likes.find((like) => like === (userId))
    
    
    const handleLike = async () => {
        
        dispatch(likePost(post._id))

        if(haslikedPost){

            setlikes(post.likes.filter((id)=> id !== (userId)))
            // if he like the post and click on it again we filter his id out
            // and return only other user likes

        } else{

            setlikes([...post.likes,userId])

        }

        
    };
    
    const Likes = () => {

        if (likes.length > 0) {

            return likes.find((like) => like === (userId)) // Check if user with id like post before if yus and he click again it get dislike 
               
            ? (
               
                <>
                 <FavoriteIcon color="secondary" fontSize="small" />  <Typography  variant='body2' component='p'>  &nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`} </Typography> 
                </>
                
            ) 
            
            :
             (
                <>
                  <FavoriteIcon variant="outlined" fontSize="small" /> <Typography  variant='body2' component='p'> &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'} </Typography> 
                </>
             );
        } 

        return <><FavoriteIcon variant="outlined" fontSize="small" /> <Typography  variant='body2' component='p'> &nbsp;Like </Typography> </>;
    };

    const openPost = () =>{
   
        history.push(`/posts/${post._id}`)

    }

    return (
        <>
        <Card className={`${classes.root} card-body`}>


                <CardHeader
                    className="card-Header"
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {/* {firstLetters} */}
                        </Avatar>
                    }
                    action={

                        (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&

                        <Menu style={{ backgroundColor: 'red' }} menuButton={
                            <MenuButton style={{ backgroundColor: 'red' }}>
                                <IconButton aria-label="settings">
                                    <MoreVertIcon className="icon" />
                                </IconButton>
                            </MenuButton>}>
                            <MenuItem onClick={upDateData}>Update</MenuItem>

                            <MenuItem onClick={() => dispatch(deletePost(post._id))}>Delete</MenuItem>


                        </Menu>
                    }
                    title={post.name ? post.name : post.creator}
                    subheader={moment(post.createdAt).fromNow()}
                />
                <CardMedia className={classes.media} image={post.selectedFile} />
            {/* <ButtonBase className='card-btn' style={{border:'1px solid red'}} onClick={openPost}> */}


                    <CardContent className="card-content">

                        <Typography variant="h6" component="h6">
                            {post.title},
                        </Typography>

                        <Typography variant="body2" component="p">
                            {post.message}
                        </Typography>

                        <Typography variant="body2" component="p">
                            {post.tags.map((tag) => `#${tag}`)}
                        </Typography>

                    </CardContent>

            {/* </ButtonBase> */}

                <CardActions className="card-actions" disableSpacing>


                    <IconButton disabled={!user?.result} onClick={handleLike}>
                        <Likes />
                    </IconButton>

                    <IconButton onClick={openPost}>

                     <ArrowRightAltIcon />
                    </IconButton>




                </CardActions>

            </Card>
        </>
    )
}

export default Post
