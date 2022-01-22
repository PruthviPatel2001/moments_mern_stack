import React, { useState, useEffect } from 'react';

// styling imports 
import { Container, Button, AppBar, Toolbar, IconButton, Fab, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import "./scss/main.css"

// components
import DialogBox from './components/DialogBox/DialogBox';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';
import BottomNav from './components/NavBar/BottomNav';
import Home from './Home/Home';
//--------

// redux imports
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts'



import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,

} from "react-router-dom";
import Auth from './components/Auth/Auth';

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


    useEffect(() => {

        dispatch(getPosts());

    }, [currentId, dispatch])

    return (
        <>


            <NavBar />

            <Switch>

                <Route exact path="/auth">

                    <Auth />

                </Route>

                <Route exact path='/'>
                    {/* <NavBar /> */}


                    <Home OpenPopUp={OpenPopUp} SetPopUp={SetPopUp} />

                    <BottomNav SetPopUp={SetPopUp} />
                </Route>

            </Switch>





        </>
    )
}

export default App
