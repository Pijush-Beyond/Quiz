import React from 'react';

import { makeStyles, Table, TableBody, TableCell, TableRow, Typography, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Total_Questions } from './Reducers/QuestionsReducer';
import { withStyles } from '@material-ui/styles';
import AncharTag from '../Api/CustomTags/AncharTag';
import { Redirect } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
}))

const StyledTableCell = withStyles(theme => ({
  body: {
    border: 0,
    color: theme.palette.text.secondary,
    "th&": {
      fontWeight: theme.typography.fontWeightMedium,
      textAlign: 'left',
    },
    "td&": {
      textAlign: 'left',
    },
  }
}))(TableCell)

export default function Results() {
  const classes = useStyle();
  const userName = useSelector(state => state.userName);
  const { right, wrong, skeeped, notVisited, justFinished, quizRunning, resultAvailable } = useSelector(state => ({
    ...state.result,
    notVisited: Total_Questions - state.result.right - state.result.wrong - state.result.skeeped,
  }));

  // for disable user selection and other features
  

  if (quizRunning) return <Redirect to="/quiz/" />
  else if (!userName || !resultAvailable ) return <Redirect to="/" />
  else return (
    <main className={classes.main}>
      <Box textAlign="center">
        <Typography variant="h6" color="textSecondary">{userName}</Typography>
        <Typography variant="subtitle1" color="textSecondary">{justFinished ? 'Quiz is ended' : 'Your Last Quiz Result is here'}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          You have scored
          <Typography variant="h5" component="div" color="primary"> {right} </Typography>
          out of {Total_Questions}
        </Typography>
      </Box>
      <AncharTag href='/rules/' color="primary">Give a another chance</AncharTag>
      <Box textAlign="center">
        <Typography variant="h6" color="textSecondary">Your Result</Typography>
        <Table size="small">
          <TableBody >
            <TableRow>
              <StyledTableCell component="th">Correct Answerd</StyledTableCell>
              <StyledTableCell>{right}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell component="th">Wrong Answerd</StyledTableCell>
              <StyledTableCell>{wrong}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell component="th">Not Attended</StyledTableCell>
              <StyledTableCell>{skeeped}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell component="th">Total Attended</StyledTableCell>
              <StyledTableCell>{Total_Questions - notVisited - skeeped}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell component="th">Not Visited</StyledTableCell>
              <StyledTableCell>{notVisited}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell component="th">Total Number of Questions</StyledTableCell>
              <StyledTableCell>{Total_Questions}</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </main>
  )
}