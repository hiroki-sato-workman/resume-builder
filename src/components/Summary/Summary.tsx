import {FC, useState} from 'react';
import { TextField, Box } from '@mui/material';
import { SummaryType } from '../../types';

interface Props {
  isEditMode: boolean;
}

const Summary: FC<Props> = ({ isEditMode }) => {
  const [summary, setSummary] = useState<SummaryType>(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData).summary : '';
  });

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■職務要約</h2>
      {isEditMode ? (
        <TextField
          fullWidth
          multiline
          minRows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      ) : (
        <div style={{ whiteSpace: 'pre-wrap' }}>{summary}</div>
      )}
    </Box>
  );
};

export default Summary;