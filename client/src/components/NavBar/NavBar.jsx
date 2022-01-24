import React, { useState, useEffect } from 'react'
import { Link, NavLink,useLocation,useHistory } from 'react-router-dom'
import decode from 'jwt-decode'
import { useStyles } from '../../App';
import { Button, AppBar, Toolbar, Typography, Avatar } from '@material-ui/core'

import {useDispatch} from 'react-redux'

const NavBar = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [FirstLetter, setFirstLetter] = useState(null);
    
    const dispatch= useDispatch()
    const history = useHistory()
    const location = useLocation() 

    console.log("from nav bar", user);

    


    const logout = () =>{
         dispatch({type:'LOGOUT'})

         history.push('/')
         setUser(null)
         
    }


    useEffect(() => {

        const token = user?.token;

        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp*1000 < new Date.getTime()){
                logout()
            }
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
                            <Typography variant='body2' component="p">
                                {user.result.name}
                            </Typography>

                        </div>
                        <div className="item">
                            <Button variant='outlined' onClick={logout}>
                                Logout
                            </Button>

                        </div>







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
