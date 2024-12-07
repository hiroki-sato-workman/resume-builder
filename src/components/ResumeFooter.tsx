import { FC } from 'react'
import { Box, Typography } from '@mui/material';

const ResumeFooter: FC = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography align="right" sx={{ mb: 2 }}>
        以上
      </Typography>
      <Typography align="center">
        是非、面接の機会をいただければと思います。何卒よろしくお願いいたします。
      </Typography>
    </Box>
  );
};

export default ResumeFooter;