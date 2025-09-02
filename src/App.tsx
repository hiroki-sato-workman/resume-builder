import {FC} from 'react';
import {
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import {useAtom} from 'jotai';
import {isEditModeAtom} from './atoms';

// Components
import ResumeHeader from './components/ResumeHeader';
import Summary from './components/Summary';
import TechnicalSkills from './components/TechnicalSkills';
import WorkHistory from './components/WorkHistory';
import Certifications from './components/Certifications';
import SelfPromotion from './components/SelfPromotion';
import ResumeFooter from './components/ResumeFooter';
import ViewModeToggle from './components/ViewModeToggle';
import HistoryToolbar from './shared/components/HistoryToolbar';
import { useKeyboardShortcuts } from './shared/hooks/useKeyboardShortcuts';
import { getViewModeStyles } from './styles/viewModeStyles';
import { theme } from './theme';
import ResumeTitle from './components/ResumeTitle';
import AppTemplate from './App.template';
import Specialties from './components/Specialties';

const App: FC = () => {
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);

  // キーボードショートカットを有効化
  useKeyboardShortcuts();

  const viewModeStyles = getViewModeStyles(isEditMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HistoryToolbar />
      <ViewModeToggle
        isEditMode={isEditMode}
        onToggle={() => setIsEditMode(!isEditMode)}
      />
      <AppTemplate isEditMode={isEditMode}>
        {/* タイトル */}
        <ResumeTitle />

        {/* ヘッダー */}
        <ResumeHeader isEditMode={isEditMode} />

        {/* 職務要約 */}
        <Summary isEditMode={isEditMode} />

        {/* 得意とする分野・スキル */}
        <Specialties
          isEditMode={isEditMode}
          viewModeStyles={viewModeStyles}
        />

        {/* PCスキル/テクニカルスキル */}
        <TechnicalSkills isEditMode={isEditMode} />

        {/* 職務経歴 */}
        <WorkHistory isEditMode={isEditMode} />

        {/* 資格 */}
        <Certifications isEditMode={isEditMode} />

        {/* 自己PR */}
        <SelfPromotion isEditMode={isEditMode} />

        {/* フッター */}
        <ResumeFooter />
      </AppTemplate>
    </ThemeProvider>
  );
};

export default App;
