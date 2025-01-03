import {FC, ReactNode} from 'react';
import { Container, Paper } from '@mui/material';

interface Props {
  children: ReactNode
  isEditMode: boolean
}

const AppTemplate: FC<Props> = ({ children, isEditMode }: Props) => {
  return (
    <Container
      maxWidth={isEditMode ? "lg" : "md"}
      sx={{
        pb: 8,
        '& .MuiContainer-root': {
          px: isEditMode ? 4 : 2
        }
      }}
    >
      <Paper
        elevation={isEditMode ? 3 : 0}
        sx={{
          p: 4,
          mt: 4,
          ...(!isEditMode && {
            minHeight: '297mm',
            width: '210mm',
            mx: 'auto'
          })
        }}
      >
        { children }
      </Paper>
    </Container>
  );
};

export default AppTemplate;