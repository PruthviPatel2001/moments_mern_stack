import React from 'react';

import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const Input = ({half,name,handelChange,label,autoFocus,type,handelShowPassword}) => {
    return (

        <>

          <Grid  item xs={12} sm={half ? 6: 12 }>

              <TextField

                 name={name}
                 onChange={handelChange}
                 variant="outlined"
                 required
                 fullWidth
                 margin='dense'
                 label={label}
                 autoFocus={autoFocus}
                 type={type}
                 InputProps={name === 'password' ?{
                     endAdornment:(
                         <InputAdornment position="end">

                             <IconButton onClick={handelShowPassword}>
                                 {type==='password' ? <VisibilityIcon/> : <VisibilityOffIcon />}
                             </IconButton>

                         </InputAdornment>
                     )
                 }:null}

              />

          </Grid>

        </>
        
        );
};

export default Input;
