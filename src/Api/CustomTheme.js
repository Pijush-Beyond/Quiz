import { createMuiTheme } from "@material-ui/core";

const customTheme = mode => createMuiTheme({
  palette: {
    type: mode
  },
  overrides: {
    MuiSwitch: {
      switchBase: {
        top: '50%',
        transform:'translateY(-50%)',
        left: 0,
        color: '#fafafa',
        zIndex: 1,
        position: 'absolute',
        transition: "left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

        ".MuiSwitch-sizeSmall &.Mui-checked": {
          transform: 'translate(16px,-50%)',
        },
        "&.Mui-checked": {
          transform: 'translate(20px,-50%)',
        }
      }
    },
    MuiTable: {
      root: {
        width: 'fit-content',
      }
    },
  },
  props:{
    MuiTableRow: {
      hover:true,
    },
  },
})

export default customTheme;