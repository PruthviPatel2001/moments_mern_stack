import { AppBar, Fab, Toolbar } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';
import React from 'react'
import { useStyles } from '../../App';

const BottomNav = ({ SetPopUp, setUpdatePopupText}) => {
    const classes = useStyles();

    const handleClick = () =>{
        setUpdatePopupText(false)
        SetPopUp(true)
    }

    return (
        <AppBar position="fixed"  className={`${classes.appBar} bottom-bar`}>
        <Toolbar>

            <Fab aria-label="add" onClick={handleClick} className={`${classes.fabButton} round-btn` }>
                <AddIcon className='add-icon'/>
            </Fab>
            <div className={classes.grow} />

        </Toolbar>
    </AppBar>
    )
}

export default BottomNav
