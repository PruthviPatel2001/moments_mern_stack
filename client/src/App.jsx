import React, { useState,useEffect } from 'react';

// styling imports 
import { Container, Button, AppBar, Toolbar, IconButton, Fab, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import "./scss/main.css"

// components
import DialogBox from './components/DialogBox/DialogBox';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
//--------

// redux imports
import { useDispatch } from 'react-redux';
import {getPosts} from './actions/posts'


const useStyles = makeStyles((theme) => ({

    appBar: {
        top: 'auto',
        bottom: 0,
        right: '30%',
        borderTopLeftRadius: '70%',
        borderTopRightRadius: '70%',
        width: '40%'
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const App = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [currentId, setCurrentId]= useState(null);

    const [OpenPopUp, SetPopUp] = useState(false)

    const [UpdatePopupText, setUpdatePopupText] = useState(false);


    useEffect(() => {
       
        dispatch(getPosts());

    }, [currentId,dispatch])

    return (
        <>

            <AppBar position="static" className="header-bar">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Moments
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">


                <DialogBox


                    title={UpdatePopupText ? "Update Post": "Create Post"}
                    openPopup={OpenPopUp}
                    setopenPopup={SetPopUp}

                >

                    <Form currentId={currentId} SetPopUp={SetPopUp} setCurrentId={setCurrentId}/>

                </DialogBox>

                <Grid container className="post-main-grid"  >

                  <Grid item className="post-grid"  lg={12} md={12} xs={12} sm={7}>

                    <Posts setCurrentId={setCurrentId} SetPopUp={SetPopUp} setUpdatePopupText={setUpdatePopupText}/>

                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                      <Form/>
                  </Grid> */}

                </Grid>

            </Container>

            <AppBar position="fixed"  className={`${classes.appBar} bottom-bar`}>
                <Toolbar>

                    <Fab aria-label="add" onClick={() => SetPopUp(true)} className={`${classes.fabButton} round-btn` }>
                        <AddIcon className='add-icon'/>
                    </Fab>
                    <div className={classes.grow} />

                </Toolbar>
            </AppBar>

        </>
    )
}

export default App
