import { FC } from 'react'
import {
  Box,
} from '@mui/material';
import ViewModeTechnicalSkills from './ViewModeTechnicalSkills';
import {TechnicalSkill} from '../../types';
import EditModeTechnicalSkills from './EditModeTechnicalSkills';

interface Props {
  technicalSkills: TechnicalSkill[];
  onChange: (skills: TechnicalSkill[]) => void;
  isEditMode: boolean;
}

const TechnicalSkills: FC<Props> = ({
  technicalSkills,
  onChange,
  isEditMode
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <h2>■PCスキル/テクニカルスキル</h2>
      {isEditMode
        ? <EditModeTechnicalSkills technicalSkills={technicalSkills} onChange={onChange}/>
        : <ViewModeTechnicalSkills technicalSkills={technicalSkills} />}
    </Box>
  );
};

export default TechnicalSkills;