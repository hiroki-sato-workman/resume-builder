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
});
