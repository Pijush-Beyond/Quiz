import React, { useEffect } from 'react';

import { makeStyles, Snackbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { submit } from './Reducers/ResultReducer';
import { withStyles } from '@material-ui/styles';
import { QUIZ_TIME } from "./Reducers/ResultReducer";

const useStyle = makeStyles(theme => ({
  warning: {
    "&>div:first-child": {
      color: theme.palette.error.main + "!important",
      borderColor: theme.palette.error.dark + "!important",
    }
  }
}))

const MySnackbar = withStyles(theme => ({
  root: {
    "&>div:first-child": {
      color: theme.palette.warning.dark,
      backgroundColor: "transparent",
      backdropFilter: "blur(12px) brightness(80%)",
      borderWidth: '1px',
      borderRadius: theme.shape.borderRadius,
      borderStyle: 'solid',
      borderColor: theme.palette.warning.dark,
      textAlign: 'center',
      "&>div": {
        flexGrow: 1,
      }
    }
  }
}))(Snackbar)

export default function Timer() {
  const classes = useStyle();
  const timeLeftFromStore = useSelector(state => state.result.endingTime);
  const [timeLeft, setTimeLeft] = useState(timeLeftFromStore - Date.now());
  const dispatch = useDispatch();
  const [warning, setWarning] = useState({ show: false, message: null, type: undefined })
  const [color, setColor] = useState('textSecondary')

  useEffect(() => {
    // console.log(Math.floor(timeLeftFromStore / 1000));  ////some problem happing there 
    const endQuiz = setTimeout(() => dispatch(submit()), timeLeft);
    return () => clearTimeout(endQuiz);
  }, [])
  
  useEffect(() => {
    let interval;
    const timer = setTimeout(() => {      
      if (Math.floor(QUIZ_TIME * 60 / 2) === Math.floor((timeLeft - 1000) / 1000)) setWarning({ show: true, message: 'Half Time !!', type: false })
      else if (Math.floor((timeLeft - 1000) / 1000) === 60 * 10) setWarning({ show: true, message: 'Last 10 Minute Left !!', type: false })
      else if (Math.floor((timeLeft - 1000) / 1000) === 60 * 5) setWarning({ show: true, message: 'Last 5 Minute Left !!', type: false })
      else if (Math.floor((timeLeft - 1000) / 1000) === 60) {
        interval = setColor("textPrimary");
        setWarning({ show: true, message: 'Last 1 Minute Left !!', type: true })
      }
      else if (Math.floor((timeLeft - 1000) / 1000) === 5) {
        setColor("error");
        setWarning({ show: true, message: 'Last 5 Seconds Left !!', type: true })
      }
      // console.log(QUIZ_TIME, Math.floor((timeLeft - 1000) / 1000), Math.floor(QUIZ_TIME * 60 / 2));      //////Time 
      if (timeLeft !== (timeLeftFromStore - Date.now())) setTimeLeft(timeLeftFromStore - Date.now());
      else setTimeLeft(timeLeft - 1000)
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [dispatch, timeLeft]);

  const { hours, minutes, seconds } = (() => ({
    hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
    minutes: Math.floor((timeLeft / 1000 / 60) % 60).toString().padStart(2, '0'),
    seconds: Math.floor((timeLeft / 1000) % 60).toString().padStart(2, '0')
  }))();

  if (timeLeftFromStore <= 0) dispatch(submit());
  return (
    <>
      <Typography component="span" color={color}>
        {`${hours}:${minutes}:${seconds}`}
      </Typography>
      <MySnackbar classes={{root: warning.type && classes.warning}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={() => setWarning({ show: false, message: null, type: false })}
        autoHideDuration={5000}
        open={warning.show}
        message={warning.message}
      />
    </>
  )
}