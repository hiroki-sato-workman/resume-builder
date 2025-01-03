import {FC, useState} from 'react';
import { TextField, Box, styled } from '@mui/material';
import {getViewModeStyles} from '../../styles/viewModeStyles';
import {getStoredResumeData} from '../../services/storage.service';


const NameContainer = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  borderBottom: '1px solid black',
  paddingBottom: '2px',
});

type Props = {
  isEditMode: boolean
}

const ResumeHeader: FC<Props> = ({ isEditMode }) => {
  const [name, setName] = useState<string>(() => getStoredResumeData('name'));

  const today = new Date();
  const dateString = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日現在`;
  const viewModeStyles = getViewModeStyles(isEditMode);

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ textAlign: 'right', mb: 2 }}>
        {dateString}
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <NameContainer>
          <span>氏名：</span>
          {isEditMode ? (
            <TextField
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ ...viewModeStyles.textField, width: '200px' }}
            />
          ) : (
            <span>{name}</span>
          )}
        </NameContainer>
      </Box>
    </Box>
  );
};

export default ResumeHeader;