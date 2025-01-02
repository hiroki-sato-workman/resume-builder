import { FC, useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  List,
  ListItem
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

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
import {TechnicalSkill} from './types';

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Hiragino Kaku Gothic ProN"',
      '"Hiragino Sans"',
      '"メイリオ"',
      'sans-serif'
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: [
            '"Hiragino Kaku Gothic ProN"',
            '"Hiragino Sans"',
            '"メイリオ"',
            'sans-serif'
          ].join(','),
        },
      },
    },
  },
});

interface ResumeData {
  name: string;
  summary: string;
  specialties: string;
  technicalSkills: TechnicalSkill[];
  workHistory: Array<{
    companyName: string;
    period: {
      start: string;
      end: string;
    };
    capital: number;
    employees: number;
    experiences: Array<{
      period: {
        start: string;
        end: string;
      };
      projectContent: string[];
      assignments: string[];
      organization: {
        teamSize: string;
        totalSize: string;
        roles: string[];
      };
      technicalEnvironment: string[];
    }>;
  }>;
  certifications: Array<{
    name: string;
    date: string;
  }>;
  selfPromotion: Array<{
    title: string;
    content: string;
  }>;
}

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
      <Container
        maxWidth={isEditMode ? "lg" : "md"}
        sx={{
          pb: 8,
          '& .MuiContainer-root': {
            px: isEditMode ? 4 : 2
          }
        }}
      >
        <Paper
          elevation={isEditMode ? 3 : 0}
          sx={{
            p: 4,
            mt: 4,
            ...(!isEditMode && {
              minHeight: '297mm',
              width: '210mm',
              mx: 'auto'
            })
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{
              mb: 4,
              letterSpacing: '1em',
              fontWeight: 'bold'
            }}
          >
            職務経歴書
          </Typography>

          <ResumeHeader
            name={resumeData.name}
            onChange={(name) => handleDataChange('name', name)}
            isEditMode={isEditMode}
          />

          <Summary
            summary={resumeData.summary}
            onChange={(summary) => handleDataChange('summary', summary)}
            isEditMode={isEditMode}
          />

          <Box sx={{ mb: 4 }}>
            <h2>■得意とする分野・スキル</h2>
            {isEditMode ? (
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={resumeData.specialties}
                onChange={(e) => handleDataChange('specialties', e.target.value)}
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
                {resumeData.specialties.split('\n')
                  .filter(item => item.trim())
                  .map((item, index) => (
                    <ListItem key={index} sx={{ padding: '4px 0' }}>
                      {item}
                    </ListItem>
                  ))}
              </List>
            )}
          </Box>

          <TechnicalSkills
            technicalSkills={resumeData.technicalSkills}
            onChange={(skills) => handleDataChange('technicalSkills', skills)}
            isEditMode={isEditMode}
          />

          <WorkHistory
            workHistory={resumeData.workHistory}
            onChange={(history) => handleDataChange('workHistory', history)}
            isEditMode={isEditMode}
          />

          <Certifications
            certifications={resumeData.certifications}
            onChange={(certs) => handleDataChange('certifications', certs)}
            isEditMode={isEditMode}
          />

          <SelfPromotion
            content={resumeData.selfPromotion}
            onChange={(content) => handleDataChange('selfPromotion', content)}
            isEditMode={isEditMode}
          />

          <ResumeFooter />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;