import {FC, useState} from 'react';
import {
  Box,
} from '@mui/material';
import ViewModeTechnicalSkills from './ViewModeTechnicalSkills';
import {TechnicalSkill} from '../../types';
import EditModeTechnicalSkills from './EditModeTechnicalSkills';
import {getStoredResumeData} from '../../services/storage.service';

interface Props {
  isEditMode: boolean;
}

const TechnicalSkills: FC<Props> = ({ isEditMode }) => {
  const [technicalSkills, setTechnicalSkills] = useState<TechnicalSkill[]>(() => getStoredResumeData('technicalSkills'));

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■PCスキル/テクニカルスキル</h2>
      {isEditMode
        ? <EditModeTechnicalSkills technicalSkills={technicalSkills} onChange={setTechnicalSkills}/>
        : <ViewModeTechnicalSkills technicalSkills={technicalSkills} />}
    </Box>
  );
};

export default TechnicalSkills;