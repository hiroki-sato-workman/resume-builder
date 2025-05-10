import {FC} from 'react';
import {
  Box,
} from '@mui/material';
import ViewModeTechnicalSkills from './ViewModeTechnicalSkills';
import EditModeTechnicalSkills from './EditModeTechnicalSkills';
import {useAtom} from 'jotai';
import {technicalSkillsAtom} from '../../atoms';

interface Props {
  isEditMode: boolean;
}

const TechnicalSkills: FC<Props> = ({ isEditMode }) => {
  const [technicalSkills, setTechnicalSkills] = useAtom(technicalSkillsAtom);

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
