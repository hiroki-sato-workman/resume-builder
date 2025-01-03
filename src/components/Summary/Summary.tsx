import { FC } from 'react';
import { TextField, Box } from '@mui/material';
import { SummaryType } from '../../types';
import {getSpecifiedStoredResumeData, saveStoredResumeData} from '../../services/storage.service';

interface Props {
  isEditMode: boolean;
}

const Summary: FC<Props> = ({ isEditMode }) => {
  const summary = getSpecifiedStoredResumeData('summary');

  const handleChangeSummaryData = (summary: SummaryType) => {
    saveStoredResumeData('summary', summary)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■職務要約</h2>
      {isEditMode ? (
        <TextField
          fullWidth
          multiline
          minRows={3}
          defaultValue={summary}
          onChange={(e) => handleChangeSummaryData(e.target.value)}
        />
      ) : (
        <div style={{ whiteSpace: 'pre-wrap' }}>{summary}</div>
      )}
    </Box>
  );
};

export default Summary;