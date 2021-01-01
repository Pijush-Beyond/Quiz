import { Button } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom';

export default function AncharTag({ children, onClick, ...props }) {
  const history = useHistory();

  const ancharClick = e => {
    e.preventDefault();
    if (onClick) onClick();
    const url = new URL(e.target.closest('a').href);
    history.push(url.pathname);
  }

  return (
    <Button {...props} onClick={ancharClick}>{children}</Button>
  )
}
