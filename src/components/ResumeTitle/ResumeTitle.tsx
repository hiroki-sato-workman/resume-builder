import { FC } from 'react'
import { Typography } from '@mui/material';

const ResumeTitle: FC = () => {
  return (
    <Typography
      variant="h4"
      component="h1"
      align="center"
      sx={{
        mb: 4,
        letterSpacing: '1em',
        fontWeight: 'bold'
      }}
    >
      職務経歴書
    </Typography>
  );
};

export default ResumeTitle;