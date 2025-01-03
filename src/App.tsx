import { FC, useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
} from '@mui/material';

// Components
import ResumeHeader from './components/ResumeHeader';
import Summary from './components/Summary';
import TechnicalSkills from './components/TechnicalSkills';
import WorkHistory from './components/WorkHistory';
import Certifications from './components/Certifications';
import SelfPromotion from './components/SelfPromotion';
import ResumeFooter from './components/ResumeFooter';
import ViewModeToggle from './components/ViewModeToggle';
import { getViewModeStyles } from './styles/viewModeStyles';
import { ResumeData } from './types';
import { theme } from './theme';
import ResumeTitle from './components/ResumeTitle';
import AppTemplate from './App.template';
import Specialties from './components/Specialties';

const initialResumeData: ResumeData = {
  name: '',
  summary: '',
  specialties: '',
  technicalSkills: [],
  workHistory: [],
  certifications: [],
  selfPromotion: []
};

const App: FC = () => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : initialResumeData;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const handleDataChange = <K extends keyof ResumeData>(
    field: K,
    value: ResumeData[K]
  ) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const viewModeStyles = getViewModeStyles(isEditMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ViewModeToggle
        isEditMode={isEditMode}
        onToggle={() => setIsEditMode(!isEditMode)}
      />
      <AppTemplate isEditMode={isEditMode}>
        {/* タイトル */}
        <ResumeTitle />

        {/* ヘッダー */}
        <ResumeHeader
          name={resumeData.name}
          onChange={(name) => handleDataChange('name', name)}
          isEditMode={isEditMode}
        />

        {/* 職務要約 */}
        <Summary
          summary={resumeData.summary}
          onChange={(summary) => handleDataChange('summary', summary)}
          isEditMode={isEditMode}
        />

        {/* 得意とする分野・スキル */}
        <Specialties
          specialties={resumeData.specialties}
          onChange={(specialties) => handleDataChange('specialties', specialties)}
          isEditMode={isEditMode}
          viewModeStyles={viewModeStyles}
        />

        {/* PCスキル/テクニカルスキル */}
        <TechnicalSkills
          technicalSkills={resumeData.technicalSkills}
          onChange={(skills) => handleDataChange('technicalSkills', skills)}
          isEditMode={isEditMode}
        />

        {/* 職務経歴 */}
        <WorkHistory
          workHistory={resumeData.workHistory}
          onChange={(history) => handleDataChange('workHistory', history)}
          isEditMode={isEditMode}
        />

        {/* 資格 */}
        <Certifications
          certifications={resumeData.certifications}
          onChange={(certs) => handleDataChange('certifications', certs)}
          isEditMode={isEditMode}
        />

        {/* 自己PR */}
        <SelfPromotion
          content={resumeData.selfPromotion}
          onChange={(content) => handleDataChange('selfPromotion', content)}
          isEditMode={isEditMode}
        />

        {/* フッター */}
        <ResumeFooter />
      </AppTemplate>
    </ThemeProvider>
  );
};

export default App;