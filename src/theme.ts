import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: [
      '"Hiragino Kaku Gothic ProN"',
      '"Hiragino Sans"',
      '"メイリオ"',
      'sans-serif'
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: [
            '"Hiragino Kaku Gothic ProN"',
            '"Hiragino Sans"',
            '"メイリオ"',
            'sans-serif'
          ].join(','),
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'lightgray',
          '& .MuiTableCell-head': {
            fontWeight: 700,
            textAlign: 'center',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: '1px solid black',
          verticalAlign: 'top',
        },
      },
    },
  },
});