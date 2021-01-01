import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles(theme => ({
  text: {
    fill: theme.palette.type === 'light'? theme.palette.common.black : theme.palette.common.white,
  }
}))

export default function Icon() {
  const classes = useStyle();
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="56.918" height="39.222" viewBox="0 0 56.918 39.222" className={classes.text}>
      <text transform="translate(45.918 24.437)" fontSize="22" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700">
        <tspan x="0" y="0">z</tspan>
      </text>
      <text transform="translate(0 0.437)" fontSize="22" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700">
        <tspan x="0" y="24">Qu</tspan>
      </text>
      <g transform="translate(67.231 49.909) rotate(180)">
        <path d="M16.406,22.005h4.92c0-3.413,1.707-6.047,5.069-6.047,2.554,0,4.894,1.5,4.894,5.1,0,2.774-1.394,4.051-3.6,5.99-2.508,2.136-4.5,4.632-4.354,8.682l.026,2.023h4.871V36.206c0-3.138,1.017-4.051,3.764-6.493,2.27-2.023,4.637-4.269,4.637-8.984,0-6.6-4.757-9.792-9.963-9.792-4.943,0-10.384,2.827-10.265,11.068Zm5.822,24.1a3.806,3.806,0,1,0,7.6,0,3.81,3.81,0,1,0-7.6,0Z" transform="translate(0 -0.25)" fill="#e00" />
      </g>
    </svg>)
}
