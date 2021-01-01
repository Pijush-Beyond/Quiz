import React from 'react';

import profile from "../Icons/profile.jpg";

import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "&>p:first-of-type": {
      flex: '2 1 auto',
    },
    "&>div:first-of-type": {
      flex: '1 1 auto',
      width: 'initial',
      height: 'initial',
      minHeight: 100,
      minWidth: 100,
      "&>img": {
        width: 100,
        height: 100,
        borderRadius: '50%',
      }
    },
    "&>p:last-child": {
      flex: '1 1 auto',
    },
  }
}))

export default function About() {
  const classes = useStyle()
  const quizRunning = useSelector(state => state.result.quizRunning);

  if (quizRunning) return <Redirect to="/quiz/" />
  else return (
    <main className={classes.main}>
      <Avatar src={profile}></Avatar>
      <Typography variant="body1" color="textSecondary" align="center">
        Hi !,<br />
        I am Pijush Barman<br />
        Enjoying full-stack web-development<br />
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center">
        React.js is awesome !!
      </Typography>
    </main>
  )
}