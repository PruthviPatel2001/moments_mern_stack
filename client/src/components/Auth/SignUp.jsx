import React from 'react'

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'

const SignUp = () => {


    const isSignup = false;

    const handelSubmit = () => {

    }

    const handelChange = ()=>{

    }

    return (
        <Container component="main" maxWidth="xs">

            <Paper elevation={3}>

                <Avatar>
                    p
                </Avatar>

            </Paper>

            <Typography variant='h5'>
                {isSignup ? 'Sign up' : 'Sign in'}
            </Typography>

            <form onSubmit={handelSubmit}>

                <Grid container spacing={2}>

                  {
                    isSignup &&(
                          <>
                              <TextField name="firstName" label="First Name" variant="outlined" onChange={handelChange}>

                              </TextField>
                          </>
                      )
                  }

                </Grid>

            </form>


        </Container>
    )
}

export default SignUp
