import "./scss/main.css"

import { AppBar, Button, Container, Fab, Grid, IconButton, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
    useLocation
} from "react-router-dom";

import AddIcon from '@material-ui/icons/Add';
import Auth from './components/Auth/Auth';
import BottomNav from './components/NavBar/BottomNav';
import DialogBox from './components/DialogBox/DialogBox';
import Form from './components/Form/Form';
import Home from './Home/Home';
import NavBar from './components/NavBar/NavBar';
import PostDetails from './components/PostDetails/PostDetails';
import Posts from './components/Posts/Posts';
import { getPosts } from './actions/posts'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

// styling imports 





// components






//--------

// redux imports









export const useStyles = makeStyles((theme) => ({

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

    const [currentId, setCurrentId] = useState(null);

    const [OpenPopUp, SetPopUp] = useState(false)

    const [UpdatePopupText, setUpdatePopupText] = useState(false);

    const user = JSON.parse(localStorage.getItem('profile'));


    
    return (
        <>


            <NavBar />

            <Switch>


                <Route exact path='/' component={() => <Redirect to="/posts" />} />
                
                <Route exact path="/auth">

                   {!user ? <Auth /> : <Redirect to='/posts' />} 

                </Route>
                

                <Route exact path='/posts'>

                    <Home OpenPopUp={OpenPopUp} SetPopUp={SetPopUp} setUpdatePopupText={setUpdatePopupText} UpdatePopupText={UpdatePopupText}/>

                    <BottomNav SetPopUp={SetPopUp} setUpdatePopupText={setUpdatePopupText} />

                </Route>

                <Route exact path='/posts/search'>

                    <Home OpenPopUp={OpenPopUp} SetPopUp={SetPopUp} />

                    <BottomNav SetPopUp={SetPopUp}  setUpdatePopupText={setUpdatePopupText} />

                </Route>

                <Route exact path='/posts/:id' component={PostDetails} />


            </Switch>





        </>
    )
}

export default App
