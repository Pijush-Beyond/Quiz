import React, { useEffect } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { exit, start } from './Reducers/ResultReducer';
import AncharTag from '../Api/CustomTags/AncharTag';
import { setQuestions } from './Reducers/QuestionsReducer';

const useStyle = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mainDiv: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    padding:theme.spacing(0,5),

    "&>h6:nth-child(3)": {
      alignSelf:'start',
    },
    "&>*:first-child": {
      flexGrow:1,
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center',
      flexDirection: 'column',
    },
    "&>*:nth-child(2)": {
      flexGrow:1,
    },
    "&>a:last-child": {
      margin: theme.spacing(0,0,2,0),
    }
  }
}))

export default function Rules( ) {
  const classes = useStyle();
  const userName = useSelector(state => state.userName );
  const quizRunning = useSelector(state => state.result.quizRunning);
  const rules = [
    "Total question count is 20",
    "1 point for each correct question",
    "No Nagetive for wrong Question",
    "You can skeep any number questions",
    "Total time for the test 20min",
    "No Jump To Privious Question",
    "Onace quiz start timer will go on what ever you do"
  ];

  useEffect(() => document.title = "Rules", []);
  
  const dispatch = useDispatch();
  if (!userName) {
    dispatch(exit())
    return <Redirect to="/" />
  }else if (quizRunning) return <Redirect to="/quiz/" />
  else return (
    <main className={classes.main}>
      <div className={classes.mainDiv}>
        <Typography variant="h5" color="primary">
          <Typography variant="body1" color="textSecondary" align="center">Hi !!,</Typography>
          {userName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="ul">
          <Typography variant="h6" color="textPrimary" align="left" component='ul'>Please Note</Typography>
          {
            rules.map((rule, index) => <li key={index}>{rule}</li>)
          }
          </Typography>
        <Typography variant="subtitle1" color="textSecondary">All The Best...</Typography>
        <AncharTag variant="contained" color="primary" fullWidth={true} onClick={() => { dispatch(start()); dispatch(setQuestions()) }} href="/quiz/">Start</AncharTag>
      </div>
    </main>
  )
}