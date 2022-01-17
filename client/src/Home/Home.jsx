import { React, useEffect ,useState} from 'react'
import { Container, Button, AppBar, Toolbar, IconButton, Fab, Typography, Grid } from '@material-ui/core'

import DialogBox from '../components/DialogBox/DialogBox'
import Form from '../components/Form/Form'
import Posts from '../components/Posts/Posts'

import { useStyles } from '../App'
import { useDispatch } from 'react-redux';
import {getPosts} from '../actions/posts'

const Home = () => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);

    const [OpenPopUp, SetPopUp] = useState(false)

    const [UpdatePopupText, setUpdatePopupText] = useState(false);


    useEffect(() => {

        dispatch(getPosts());

    }, [currentId, dispatch])
    return (
        <>

            <Container maxWidth="lg">


                <DialogBox


                    title={UpdatePopupText ? "Update Post" : "Create Post"}
                    openPopup={OpenPopUp}
                    setopenPopup={SetPopUp}

                >

                    <Form currentId={currentId} SetPopUp={SetPopUp} setCurrentId={setCurrentId} />

                </DialogBox>

                <Grid container className="post-main-grid"  >


                    <Posts setCurrentId={setCurrentId} SetPopUp={SetPopUp} setUpdatePopupText={setUpdatePopupText} />



                </Grid>

            </Container>

        </>
    )
}

export default Home
