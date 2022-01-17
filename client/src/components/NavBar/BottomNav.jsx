import React from 'react'
import {  AppBar, Toolbar, Fab } from '@material-ui/core'
import { useStyles } from '../../App';
import AddIcon from '@material-ui/icons/Add';


const BottomNav = ({ SetPopUp}) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed"  className={`${classes.appBar} bottom-bar`}>
        <Toolbar>

            <Fab aria-label="add" onClick={()=> SetPopUp(true)} className={`${classes.fabButton} round-btn` }>
                <AddIcon className='add-icon'/>
            </Fab>
            <div className={classes.grow} />

        </Toolbar>
    </AppBar>
    )
}

export default BottomNav
