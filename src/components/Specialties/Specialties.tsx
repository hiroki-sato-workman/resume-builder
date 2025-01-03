import { FC } from 'react';
import { Box, List, ListItem, TextField } from '@mui/material';
import { SpecialtiesType } from '../../types';
import { SxProps } from '@mui/system';
import {getSpecifiedStoredResumeData, saveStoredResumeData} from '../../services/storage.service';

interface Props {
  isEditMode: boolean
  viewModeStyles: {[p: string]: SxProps}
}

const Specialties: FC<Props> = ({ isEditMode, viewModeStyles}: Props) => {
  const specialties = getSpecifiedStoredResumeData('specialties');

  const handleChangeSpecialtiesData = (specialties: SpecialtiesType) => {
    saveStoredResumeData('specialties', specialties)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■得意とする分野・スキル</h2>
      {isEditMode ? (
        <TextField
          fullWidth
          multiline
          minRows={3}
          defaultValue={specialties}
          onChange={(e) => handleChangeSpecialtiesData(e.target.value)}
          placeholder="各項目を改行で区切って入力してください"
          sx={viewModeStyles.textField}
        />
      ) : (
        <List sx={{
          listStyleType: 'disc',
          pl: 4,
          '& li': {
            display: 'list-item',
            pl: 1,
            pb: 0.5
          }
        }}>
          {specialties.split('\n')
            .filter(item => item.trim())
            .map((item, index) => (
              <ListItem key={index} sx={{ padding: '4px 0' }}>
                {item}
              </ListItem>
            ))}
        </List>
      )}
    </Box>
  );
};

export default Specialties;