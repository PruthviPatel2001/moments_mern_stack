import React from 'react'
import { useStyles } from '../../App';
import { Button, AppBar, Toolbar, Typography, Avatar } from '@material-ui/core'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    const classes = useStyles();

    const user = null;

    return (
        <AppBar position="static" className="header-bar" style={{display:'flex',justifyContent:'space-between'}}>
            <Toolbar className="to-bar">

                <Typography component={Link} to="/" variant="h6" className={classes.title}>
                    Moments
                </Typography>

              


            </Toolbar>

            <Toolbar>
                {user ?
                    <div className='profile'>

                        <Avatar>
                            P
                        </Avatar>

                        <Typography variant='h6' component="h6">
                            Pruthvi
                        </Typography>

                        <Button variant='outlined'>
                            Logout
                        </Button>

                    </div> : (

                        <NavLink to='/auth'>

                            <Button color="inherit">Login</Button>

                        </NavLink>

                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
