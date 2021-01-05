import React, { useEffect, useState } from 'react';
import { Box, makeStyles,  TextField, Button, Typography } from '@material-ui/core';

import svg from '../Icons/quiz.svg';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from './Reducers/UserNameReducer';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems:'center',
    
    "&>*":{
      width:'45%',
    },

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      padding:theme.spacing(0,3),
      "&>img": {
        width: '80%',
      },
      "&>div": {
        width: 'inherit',
      },
    }
  },
  form: {
    "&>*": { margin:theme.spacing(0.5,0),},
    "&>button:last-child": { borderRadius: theme.spacing(5), padding: theme.spacing(1, 3.5) },
  },
  roundedInput: {
    borderRadius: theme.spacing(5),
    overflow:'hidden',
    "& input": {
      padding: theme.spacing(2, 3),
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey['700'] : theme.palette.grey['200'],
    }
  }
}))

function Home(props) {
  const classes = useStyles(props);
  const userName = useSelector(state => state.userName)
  const [state, setState] = useState({ userName });
  const dispatch = useDispatch();
  const quizRunning = useSelector(state => state.result.quizRunning);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserName(state.userName));
    props.history.push('/rules/');
  }
  useEffect(() => document.title = "Welcome", []);
  
  if (quizRunning) return <Redirect to="/quiz/" />
  else return (
    <main className={classes.main}>
      <Box display='flex' flexDirection="column" justifyContent="center">
        <Typography variant="h4" color="textSecondary"><small>take a quick brain brushing session with us</small></Typography>
        <Typography variant="h4" color="textSecondary"><b>Take a <Typography variant="inherit" component="span" color="error">Quiz</Typography></b></Typography>
        <form action="/rules/" className={classes.form} onSubmit={handleSubmit} >
          <TextField name="userName" classes={{ base: classes.textField }} onInput={e => setState({ ...state, userName: e.target.value })} placeholder="Enter YourName" fullWidth={true} variant="outlined" InputProps={{ className: classes.roundedInput }} value={state.userName} />
          <Button type="submit" disabled={state.userName===''?true:false} variant="contained" disableElevation={true} color="primary" endIcon={ <ArrowForwardRoundedIcon /> }>
            <Typography variant="h6" color="initial"><b>Submit</b></Typography>
          </Button>
        </form>
      </Box>
      <img src={svg} alt="svg" style={{objectFit:'contain'}}/>
    </main>
  )
}


export default Home

