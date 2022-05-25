import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import decode from 'jwt-decode'
import {useDispatch} from 'react-redux'
import { useStyles } from '../../App';

const NavBar = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [FirstLetter, setFirstLetter] = useState(null);
    
    const dispatch= useDispatch()
    const history = useHistory()
    const location = useLocation() 

    const logout = () =>{
         dispatch({type:'LOGOUT'})

         history.push('/')
         setUser(null)
         
    }


    useEffect(() => {

        const token = user?.token;

    
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          }


        setUser(JSON.parse(localStorage.getItem('profile')))

        setFirstLetter (user?.result.name
        .split(' ')
        .map(word => word[0])
        .join(''))




    }, [location]) // usefffect only called when location get chagne in this loacation change from 
                    // "/auth" -> "/"  if u reload page useEffect wont get called because it going to be same lpcation

    return (
        <AppBar position="static" className="header-bar" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Toolbar className="to-bar">

                <Link to='/'>
                    <Typography variant="h6" className={classes.title}>
                        Moments
                    </Typography>

                </Link>




            </Toolbar>

            <Toolbar>
                {user ?
                    <div className='profile'>
                        <Avatar>
                            {FirstLetter}
                        </Avatar>

                        <div className="item">
                            <Typography variant='body2' component="p" style={{marginRight:'1rem'}}>
                                {user.result.name}
                            </Typography>

                        </div>
                        <div className="item">
                            <Button variant='outlined' size='small' onClick={logout} style={{color:'white',border:'1px solid white'}}>
                                Logout
                            </Button>

                        </div>







                    </div> : (

                        <Link to='/auth'>

                            <Button color="inherit">Login</Button>

                        </Link>

                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
