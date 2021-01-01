import React, { useState } from 'react';

import { makeStyles, AppBar, Toolbar, Typography, IconButton, Switch, useTheme, useMediaQuery, List, Slide, ListItem, Button } from '@material-ui/core';
import { Brightness4, BrightnessHigh } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '../Icons/Icon';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { setMode } from './Reducers/Mode';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  toolbar: {
    "&>*": {
      margin: theme.spacing(0, 0.5),
    },
    "&>*:first-child:not(button)": { margin: theme.spacing(0, 0.5, 0, 0) },
    '&>*:last-child': { margin: theme.spacing(0, 0, 0, 0.5) },
  },
  menuButton: {
    transform: 'translateX(-10px)',
    marginRight: '-10px',
  },
}));

const MyList = withStyles(theme => ({
  root: {
    position: 'absolute',
    height: 'calc(100vh - 56px)',
    left: 0,
    right: 0,
    top: 56,
    zIndex: 100,
    backdropFilter: 'blur(10px) brightness(80%)',
    padding: 0,
  }
}))(List)

const MyListItem = withStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'uppercase',
  }
}))(ListItem)

const MyNavButton = withStyles(theme => ({
  root: {
    color: theme.palette.type === "dark" ? theme.palette.common.white : theme.palette.grey.A700,
    borderBottom: '1px solid '+ theme.palette.success.main,
    borderRadius: theme.spacing(.5,.5,0,0),
  },
  textSecondary: {
    border: 'none', 
  }
}))(Button)


export default function NavBar() {
  const history = useHistory();
  const match1 = useRouteMatch('/quiz/');
  const home = useRouteMatch('/').isExact;
  const about = useRouteMatch('/about/');
  const result = useRouteMatch('/results/');
  const classes = useStyles();
  const mode = useSelector(state => state.mode.value);
  const resultAvailable = useSelector(state => state.result.resultAvailable);
  const dispatch = useDispatch();
  const theme = useTheme();
  const breakPoints = useMediaQuery(theme.breakpoints.down('xs'));
  const [mobileNav, setMobileNav] = useState(false);

  const handleDarkMode = e => dispatch(setMode(e.target.checked ? 'dark' : 'light'));

  const handleMobilePageNavigation = (e) => {
    e.preventDefault()
    setMobileNav(false);
    const url = new URL(e.target.closest('a').href);
    history.push(url.pathname);
  }

  const showOption = match1 ? false : true;

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar className={classes.toolbar}>
        {breakPoints && showOption && <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={() => setMobileNav(!mobileNav)}>
          <MenuIcon />
        </IconButton>}
        <Typography variant="body1" className={classes.title}>
          <Icon />
        </Typography>
        {(showOption && !breakPoints &&
          <>
            <MyNavButton color={home ? 'secondary' : 'default'} disableElevation={true} onClick={handleMobilePageNavigation} href="/" tabIndex={21}><small>Home</small></MyNavButton>
            <MyNavButton color={about ? 'secondary' : 'default'} disableElevation={true} onClick={handleMobilePageNavigation} href="/about/" tabIndex={22}><small>About</small></MyNavButton>
            {resultAvailable && <MyNavButton color={result ? 'secondary' : 'default'} onClick={handleMobilePageNavigation} disableElevation={true} href="/results/" tabIndex={23}><small>Result</small></MyNavButton>}
          </>
        )}
        <Switch tabIndex={20} name="mode" checked={mode === 'dark' ? true : false} onChange={handleDarkMode} icon={<Brightness4 htmlColor="black" />} checkedIcon={<BrightnessHigh />} color="default" />
      </Toolbar>
      {
        breakPoints && showOption &&
        <Slide in={mobileNav} direction='up' mountOnEnter unmountOnExit>
          <MyList>
            <MyListItem divider={true} button={true} component="button" onCLick={handleMobilePageNavigation} href="/">
              Home
            </MyListItem>
            <MyListItem divider={true} button={true} component="button" onCLick={handleMobilePageNavigation} href="/About/">
              About
            </MyListItem>
            {
              resultAvailable &&
              <MyListItem divider={true} button={true} component="button" onCLick={handleMobilePageNavigation} href="/results/">
                Result
              </MyListItem>
            }
          </MyList>
        </Slide>
      }
    </AppBar>
  )
}