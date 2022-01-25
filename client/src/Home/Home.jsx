import { React, useEffect, useState } from 'react'
import { Container, Button, AppBar, TextField, Typography, Grid, Paper } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { Chip } from '@material-ui/core'
import TagsInput from '../components/TagsInput/TagsInput'

import DialogBox from '../components/DialogBox/DialogBox'
import Form from '../components/Form/Form'
import Posts from '../components/Posts/Posts'

import { useStyles } from '../App'
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts'

import Paginate from '../components/Pagination'


function useQuery() {
    return new URLSearchParams(useLocation().search)
}


const Home = ({ OpenPopUp, SetPopUp }) => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);

    const query = useQuery()

    const history = useHistory()

    const page = query.get('page') || 1

    const searchQuery = query.get('searchQuery')

    // const [OpenPopUp, SetPopUp] = useState(false)

    const [UpdatePopupText, setUpdatePopupText] = useState(false);

    const handleSelecetedTags = (items) => {
        console.log(items);
    }

    useEffect(() => {

        dispatch(getPosts());

    }, [currentId, dispatch])

    return (
        <>

            <div className='post-container'>
                {/* style={{ border: '1px solid red' }} */}


                <DialogBox


                    title={UpdatePopupText ? "Update Post" : "Create Post"}
                    openPopup={OpenPopUp}
                    setopenPopup={SetPopUp}

                >

                    <Form currentId={currentId} SetPopUp={SetPopUp} setCurrentId={setCurrentId} />

                </DialogBox>

                <Grid container className="post-main-grid"  >

                    <Grid item lg={9} md={9} className='post-box-grid' >

                        <Posts setCurrentId={setCurrentId} SetPopUp={SetPopUp} setUpdatePopupText={setUpdatePopupText} />

                    </Grid>




                    <Grid item lg={3} md={3} >

                        <Paper className='' elevation={6} >
                        

                            <TextField
                                name="search" variant="outlined"
                                label="Search" fullWidth={true} margin='dense'
                                value="TEST" onChange={() => { }}
                            />

                        


                            {/* <TagsInput

                                    selectedTags={handleSelecetedTags}
                                    fullWidth
                                    variant="outlined"
                                    id="tags"
                                    name="tags"
                                    placeholder="add Tags"
                                    label="Tags"
                                /> */}
                            <Paginate />


                        </Paper>



                    </Grid>

                </Grid>

            </div>

        </>
    )
}

export default Home
