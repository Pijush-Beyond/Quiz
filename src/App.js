import React from 'react';
import './App.css';
import Home from './Component/Home';
import Footer from './Component/Footer';
import NavBar from './Component/NavBar';
import { Switch, Route, Redirect } from "react-router-dom";
import About from './Component/About';
import Rules from './Component/Rules';
import Quiz from './Component/Quiz';
import Results from './Component/Results';
import { ThemeProvider } from '@material-ui/core';
import customTheme from './Api/CustomTheme';
import { useSelector } from 'react-redux';

export default function App() {
  const mode = useSelector(state => state.mode.value);
  const theme = React.useMemo(()=>customTheme(mode),[mode])

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about/" component={About} />
        <Route exact path="/rules/" component={Rules} />
        <Route exact path="/quiz/" component={Quiz} />
        <Route exact path="/results/" component={Results} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </ThemeProvider>
  );
}
