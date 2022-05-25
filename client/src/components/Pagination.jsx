import { Pagination, PaginationItem } from '@material-ui/lab'
import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import {Link} from 'react-router-dom'
import { getPosts } from '../actions/posts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    ul: {
        justifyContent: 'space-around'
    }


}));



const Paginate = ({page}) => {

    const classes = useStyles()

    const dispatch= useDispatch()

    const {numberOfPages} = useSelector((state)=> state.posts)


    useEffect(() => {

        if(page) {


            dispatch(getPosts(page));
        }


    }, [dispatch,page])

    return (
        <>
            <Pagination 
                classes={{ul:classes.ul}}
                style={{ marginTop: '1rem' }}
                count={numberOfPages}
                page={Number(page) || 1}
                variant="outlined"
                color="primary"
                renderItem={(item)=>(
                    
                    <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
                )}

            />
        </>
    )

  
};

export default Paginate;
