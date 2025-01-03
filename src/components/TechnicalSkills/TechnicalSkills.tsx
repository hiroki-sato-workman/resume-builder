import { FC } from 'react';
import {
  Box,
} from '@mui/material';
import ViewModeTechnicalSkills from './ViewModeTechnicalSkills';
import {TechnicalSkill} from '../../types';
import EditModeTechnicalSkills from './EditModeTechnicalSkills';
import {getSpecifiedStoredResumeData, saveStoredResumeData} from '../../services/storage.service';

interface Props {
  isEditMode: boolean;
}

const TechnicalSkills: FC<Props> = ({ isEditMode }) => {
  const technicalSkills = getSpecifiedStoredResumeData('technicalSkills');

  const handleChangeTechnicalSkillsData = (technicalSkills: TechnicalSkill[]) => {
    saveStoredResumeData('technicalSkills', technicalSkills)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■PCスキル/テクニカルスキル</h2>
      {isEditMode
        ? <EditModeTechnicalSkills technicalSkills={technicalSkills} onChange={handleChangeTechnicalSkillsData}/>
        : <ViewModeTechnicalSkills technicalSkills={technicalSkills} />}
    </Box>
  );
};

export default TechnicalSkills;