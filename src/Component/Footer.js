import React from 'react';

import { Box, makeStyles } from '@material-ui/core';
import { GitHub, LinkedIn } from '@material-ui/icons';
import { useRouteMatch } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  root: {
    padding:theme.spacing(0,3),
    "&>*":{
      margin: theme.spacing(0, 1.5),
    }
  }
}))

export default function Footer() {
  const classes = useStyle()
  const isTest = useRouteMatch('/quiz/');

  if (!isTest) return (
    <Box component="footer" display="flex" justifyContent="flex-end" className={classes.root} alignItems="center" height={64} >
      <a href="https://github.com/Pijush-Beyond/" target="_blank" rel="noopener noreferrer"><GitHub htmlColor="black" /></a>
      <a href="https://www.linkedin.com/in/pijush-barman-11699a197/" target="_blank" rel="noopener noreferrer"><LinkedIn fontSize="large" color="primary" /></a>
    </Box>
  )
  else return null;
}