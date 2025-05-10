import { FC } from 'react';
import { TextField, Box } from '@mui/material';
import { useAtom } from 'jotai';
import { summaryAtom } from '../../atoms';

interface Props {
  isEditMode: boolean;
}

const Summary: FC<Props> = ({ isEditMode }) => {
  const [summary, setSummary] = useAtom(summaryAtom);

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
