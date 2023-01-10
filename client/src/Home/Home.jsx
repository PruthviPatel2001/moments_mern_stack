import { AppBar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { React, useEffect, useState } from 'react'
import { getPostBySearch, getPosts } from '../actions/posts'
import { useHistory, useLocation } from 'react-router-dom'

import DialogBox from '../components/DialogBox/DialogBox'
import Form from '../components/Form/Form'
import Paginate from '../components/Pagination'
import Posts from '../components/Posts/Posts'
import TagsInput from '../components/TagsInput/TagsInput'
import { useDispatch } from 'react-redux';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}


const Home = ({ OpenPopUp, SetPopUp,setUpdatePopupText ,UpdatePopupText}) => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);

    const query = useQuery()

    const history = useHistory()

    const page = query.get('page') || 1;

    const searchQuery = query.get('searchQuery')
    const tagQuery = query.get('tags')


    const [search, setsearch] = useState('');
    const [tags, settags] = useState([]);



    const handleSelecetedTags = (items) => {
        settags(items)
    }

    const handelKeyPress = (e) => {

        if (e.keyCode === 13) {  //code 13 is for enter btn
            searchPost()
        }
    }

  useEffect(() => {

      
      if(searchQuery ||tagQuery ){
        let search = searchQuery
        let tags = tagQuery
        
        dispatch(getPostBySearch({ search, tags: tags }))
    }
    

  }, [dispatch,searchQuery,tagQuery]);
  

    const searchPost = () => {

        if (search.trim() || tags) {
            // dispact -> fect search post
            dispatch(getPostBySearch({ search, tags: tags.join(',') }))

            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)

        } else {
            history.push('/')
        }
    }

    return (
        <>

            <div className='post-container'>


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


                    <Grid item lg={3} md={3} className='side-box' >

                        <Paper className='paper' elevation={6} >


                            <TextField
                                name="search" variant="outlined"
                                label="Search" fullWidth={true} margin='dense'
                                value={search} onChange={(e) => setsearch(e.target.value)}
                                onKeyPress={handelKeyPress}
                            />


                            <TagsInput

                                selectedTags={handleSelecetedTags}
                                fullWidth
                                variant="outlined"
                                id="tags"
                                name="tags"
                                placeholder="add Tags"
                                label="Tags"
                                style={{ marginTop: '2rem' }}
                            />

                            <div className="btn-box">

                                <Button className="btn btn-1" onClick={searchPost} color="primary" variant="contained" >
                                    Search
                                </Button>

                                <Button className="btn btn-2" onClick={() => history.push('/')} color="primary" variant="contained" >
                                    View All
                                </Button>

                            </div>



                            {
                                (!searchQuery && !tags.length) && (

                                    <Paginate page={page} />
                                )
                            }


                        </Paper>



                    </Grid>

                </Grid>

            </div>

        </>
    )
}

export default Home
