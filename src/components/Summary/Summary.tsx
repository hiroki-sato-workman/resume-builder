import { FC } from 'react'
import { TextField, Box } from '@mui/material';

interface Props {
  summary: string;
  onChange: (summary: string) => void;
  isEditMode: boolean;
}

const Summary: FC<Props> = ({ summary, onChange, isEditMode }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <h2>■職務要約</h2>
      {isEditMode ? (
        <TextField
          fullWidth
          multiline
          minRows={3}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div style={{ whiteSpace: 'pre-wrap' }}>{summary}</div>
      )}
    </Box>
  );
};

export default Summary;