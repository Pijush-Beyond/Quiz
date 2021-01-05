import React, { useEffect, useState } from 'react';

import { makeStyles, Box, Button, Typography, FormControl, FormHelperText, Snackbar, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Timer from './Timer';
import { next, right, skeeped, wrong, updateLocalStorageWithCurrentResult, submit, exit, AUTO_JUMP_TIME_AFTER_ANSWER } from './Reducers/ResultReducer';
import { withStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyle = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    alignItems: 'center',
  },
  timer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    minWidth: 'fit-content',
    // padding:theme.spacing(0,2),
  },
  question: {
    "&>*:first-child": {
      padding: theme.spacing(0, 0, 1, 0),
    },
  }
}))

const OptionButton = withStyles(theme => ({
  root: {
    borderRadius: theme.spacing(10),
    overflow: 'hidden',
    margin: theme.spacing(.75, 0),
    alignSelf: 'center',
    "&:hover,&:focus": {
      borderColor: theme.palette.grey.A700,
      "&>span:first-child": {
        color: theme.palette.text.primary,
      }
    },
  },
  outlinedPrimary: {
    borderColor: theme.palette.success.main,
    cursor: 'default',
    pointerEvents: 'none',
    "&>span:first-child": { color: theme.palette.success.main, },
    "&:focus": {
      borderColor: theme.palette.success.main,
      "&>span:first-child": {
        color: theme.palette.success.main,
      }
    }
  },
  outlinedSecondary: {
    borderColor: theme.palette.error.dark,
    cursor: 'default',
    pointerEvents: 'none',
    "&>span:first-child": { color: theme.palette.error.dark, },
    "&:focus": {
      borderColor: theme.palette.error.dark,
      "&>span:first-child": {
        color: theme.palette.error.dark,
      }
    }
  },
  label: {
    textAlign: 'start',
    margin: theme.spacing(0, .5),
    textTransform: 'none',
    color: theme.palette.grey.A700,
  },
  fullWidth: {
    display: 'block',
    width: 'calc(100% - 8px)'
  }
}))(Button)

const NextButton = withStyles(theme => ({
  root: {
    borderRadius: theme.spacing(10),
    overflow: 'hidden',
    alignSelf: 'flex-end',
    margin: theme.spacing(1),
  },
  label: {
    padding: theme.spacing(0, 4),
  },
  outlined: {
    "&:hover,&:focus": {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[4],
      "&>span": {
        color: theme.palette.common.white,
      }
    }
  }
}))(Button)

const MyFormControl = withStyles(theme => ({
  root: {
    minHeight: "fit-content",
    width: "60%",
    height: "calc(100vh - 100px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    padding: "16px 0",
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'inherit',
      padding: theme.spacing(0, 3),
    },
  },
}))(FormControl)

const MyFormHelperText = withStyles(theme => ({
  root: {
    color: theme.palette.success.main,
  }
}))(FormHelperText)

const MySnackbar = withStyles(theme => ({
  root: {
    "&>div:first-child": {
      color: theme.palette.info.light,
      backgroundColor: "transparent",
      backdropFilter: "blur(12px) brightness(80%)",
    }
  }
}))(Snackbar)

export default function Quiz() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions);
  const { quizRunning, currentQuestion, resultAvailable } = useSelector(state => state.result);
  const [result, setResult] = useState({ result: false, answerd: false, choice: null });
  const userName = useSelector(state => state.userName);
  const [countDown, setCountDown] = useState(null);
  const [alert, setAlert] = useState(false)
  const [stopCountDown, setStopCountDown] = useState(false) 

  const handleAnswer = (e, no) => {
    e.target.blur();
    if (result.answerd) return null;
    else if (no !== questions[currentQuestion - 1].answer)
      setResult({ result: false, answerd: true, choice: no });
    else
      setResult({ result: true, answerd: true, choice: no });
    setAlert(true);
    setCountDown(AUTO_JUMP_TIME_AFTER_ANSWER);
  }

  const jumpToNext = (e) => {
    e.target.blur();
    e.preventDefault();
    if (!result.answerd) dispatch(skeeped());
    dispatch(next());
    setCountDown(null);
  }

  useEffect(() => {
    if (result.answerd) {
      if (result.result)
        dispatch(right());
      else
        dispatch(wrong());
      let JumpNextTimeOut;
      if (!stopCountDown) {
        JumpNextTimeOut = setTimeout(() => {
          if (!result.answerd) dispatch(skeeped());
          dispatch(next());
          setCountDown(null);
        }, AUTO_JUMP_TIME_AFTER_ANSWER * 1000);
      }
      else clearTimeout(JumpNextTimeOut);
      return () => clearTimeout(JumpNextTimeOut);
    }
  }, [dispatch, result, stopCountDown])

  useEffect(() => {
    if (countDown && alert) {
      const countDownTimer = setTimeout(() => setCountDown(countDown - 1), 1000);
      if (stopCountDown) clearTimeout(countDownTimer);
      return () => {
        clearTimeout(countDownTimer)
      }
    }
  }, [countDown, alert, stopCountDown])

  // for Window reloader
  useEffect(() => {
    const alertWhenNavigation = () => {
      if (!document.hidden) window.alert(`Don't Navigate Through Tabs Again`);
      dispatch(updateLocalStorageWithCurrentResult());
    }
    document.addEventListener('visibilitychange', alertWhenNavigation);
    window.onbeforeunload = function () {
      dispatch(updateLocalStorageWithCurrentResult());
      return "Discard changes?";
    };
    return () => {
      document.removeEventListener('visibilitychange', alertWhenNavigation);
      window.onbeforeunload = null;
      dispatch(updateLocalStorageWithCurrentResult());
    };
  }, [dispatch])

  useEffect(() => {
    document.title = `Question no ${currentQuestion}`;
    setResult({ result: false, answerd: false, choice: null });
    setAlert(false);
    setCountDown(null);
    setStopCountDown(false);
  }, [currentQuestion])

  const handleFinalSubmit = () => dispatch(submit());

  if (!userName) {
    dispatch(exit())
    return <Redirect to="/" />
  } else if (resultAvailable && !quizRunning) return <Redirect to="/results/" />
  else if (!quizRunning) return <Redirect to="/" />
  else {
    return (
      <main className={classes.main}>
        <Box className={classes.timer}>
          <Timer />
          {/* {countDown !== null && <Typography component="span" variant="subtitle1" color="textPrimary" align='center'>Auto Load Next Question in<br />{countDown}s</Typography>} */}
          <Button disableFocusRipple={true} variant="text" color="default" onClick={handleFinalSubmit} tabIndex={questions[currentQuestion - 1].options.length + 2}>End Quiz</Button>
        </Box>
        <MyFormControl component="form" onSubmit={jumpToNext} className={classes.question} error={!result.result && result.answerd}>
          <Typography variant="h6" color="textSecondary">{currentQuestion}. {questions[currentQuestion - 1].question}</Typography>
          {questions[currentQuestion - 1].options.map((option, no) =>
            <OptionButton
              autoFocus={false}
              disableFocusRipple={true}
              tabIndex={no + 1}
              fullWidth={true}
              key={no}
              onClick={(e) => handleAnswer(e, no + 1)}
              variant="outlined"
              color={result.answerd ? ((questions[currentQuestion - 1].answer === (no + 1)) ? 'primary' : ((result.choice === (no + 1)) ? 'secondary' : 'default')) : 'default'}
              disabled={result.answerd && (result.choice !== (no + 1)) && (questions[currentQuestion - 1].answer !== (no + 1))}
            >
              {option}
            </OptionButton>
          )}
          <MyFormHelperText style={{ opacity: !result.answerd ? 0 : 1 }}>{result.result ? "Yah!!, You Are Awsome" : "Sorry!!, Try Next"}</MyFormHelperText>
          <NextButton disableFocusRipple={true} size="medium" variant={result.answerd ? 'contained' : 'outlined'} color="primary" type="submit" tabIndex={questions[currentQuestion - 1].options.length + 1}>Next</NextButton>
        </MyFormControl>
        <MySnackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={alert}
          message={`Auto Load Next Question in ${countDown}s`}
          action={
            <React.Fragment>
              <Button color="primary" size="small" onClick={() => { setStopCountDown(true);setAlert(false)}} title="Stop Auto Load" >Stop Count</Button>
              <IconButton aria-label="close" color="inherit" onClick={() => setAlert( false )}>
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        />
      </main>
    )
  }
}