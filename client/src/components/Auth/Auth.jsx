import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {signin, signup} from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'

import { GoogleLogin } from 'react-google-login'
import Input from './Input'
import { useHistory } from 'react-router-dom'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {



    const [showPassword, setshowPassword] = useState(false);
    const [isSignup, setisSignUp] = useState(false);
    const [formData, setformData] = useState(initialState);
    const history = useHistory()

    const err = useSelector((state) => state.authReducer.authData);
 
    const dispatch = useDispatch()


    const handelSubmit = (e) => {
        e.preventDefault()
        // console.log(formData);

        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))

        }

    }



    const handelChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setformData(
            { ...formData, [name]: value }
        )

    }

    const handelShowPassword = () => {
        setshowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setisSignUp(!isSignup)
        setshowPassword(false)
    }

    const googleSuccess = async (res) => {

        // console.log("google sign in successfull ");


        const result = res?.profileObj
        const token = res?.tokenId;

        try {

            dispatch(
                {
                    type: 'AUTH', data: { result, token }
                }
            )

            history.push('/')

        } catch (error) {
            console.log(error);

        }
    }

    const googleFailure = () => {
        // console.log("google sign in unsuccessfull . try again");
    }
  
    return (
        <Container component="main" maxWidth="xs">

            <Paper elevation={3} className="authenticate-container" >

              



                <Typography variant='h5' className="header" align='center'>
                    {isSignup ? 'Sign up' : 'Sign in'}
                </Typography>

                <form onSubmit={handelSubmit}>

                    <Grid container spacing={2}>

                        {
                            isSignup && (
                                <>


                                    <Input name="firstName" label="First Name" handelChange={handelChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handelChange={handelChange} half />



                                </>
                            )
                        }

                        <Input name='email' label="Email-Id" handelChange={handelChange} type="email" />
                        <Input name='password' label="Password" handelChange={handelChange} type={showPassword ? 'text' : 'password'} handelShowPassword={handelShowPassword} />

                        {err && <Typography variant='body2' component="p" style={{ color: "red" }}>{err}</Typography>}
                        {isSignup && <Input name='confirmPassword' label="Confirm password" handelChange={handelChange} type='password' />}

                      
                      <div className="actions">

                        <Button type="submit" className="btn"  variant="contained">

                            {isSignup ? 'Sign Up' : 'Sign in'}

                        </Button>

                        <GoogleLogin

                            clientId='243299781491-eu56idd2i60dl1h5llse1vvnmvvv5ot0.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <Button
                                    className='g-btn' 
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled} startIcon=''
                                    variant="contained"

                                >

                                    Google Sign In

                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"

                        />

                      </div>
                      

                        <div container className="bottom-text">

                            <Button  onClick={switchMode} >

                                {isSignup ? 'Already have account ? Sign In' : ' don"t have account ? Sign Up'}

                            </Button>

                        </div>

                    </Grid>

                </form>
            </Paper>

        </Container >
    )
}

export default SignUp
