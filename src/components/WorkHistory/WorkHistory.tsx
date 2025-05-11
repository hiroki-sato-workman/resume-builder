import React, { useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Stack,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAtom } from 'jotai';
import { workHistoryAtom } from '../../atoms';
import FromToDatePicker from './FromToDatePicker';
import TextFieldForWorkHistory from './TextFieldForWorkHistory';
import { createNewCompany, createNewExperience, generateNewCompanyId, generateNewExperienceId } from '../../shared/utils';

interface Props {
  isEditMode: boolean;
}

const WorkHistory: React.FC<Props> = ({ isEditMode }) => {
  const [workHistory, setWorkHistory] = useAtom(workHistoryAtom);

  // 会社を追加
  const handleAddCompany = useCallback(() => {
    const existingIds = Object.keys(workHistory);
    const newCompanyId = generateNewCompanyId(existingIds);
    const newCompany = createNewCompany({}, existingIds);
    
    setWorkHistory({
      ...workHistory,
      [newCompanyId]: newCompany
    });
  }, [workHistory, setWorkHistory]);

  // 会社を削除
  const handleDeleteCompany = useCallback((companyId: string) => {
    const { [companyId]: _, ...remainingCompanies } = workHistory;
    
    setWorkHistory(remainingCompanies);
  }, [workHistory, setWorkHistory]);

  // 経験を追加
  const handleAddExperience = useCallback((companyId: string) => {
    const company = workHistory[companyId];
    const existingIds = Object.keys(company.experiences);
    
    const newExpId = generateNewExperienceId(existingIds);
    const newExperience = createNewExperience({}, existingIds);
    
    const updatedCompany = {
      ...company,
      experiences: {
        ...company.experiences,
        [newExpId]: newExperience
      }
    };
    
    setWorkHistory({
      ...workHistory,
      [companyId]: updatedCompany
    });
  }, [workHistory, setWorkHistory]);

  // 経験を削除
  const handleDeleteExperience = useCallback((companyId: string, expId: string) => {
    const company = workHistory[companyId];
    const { [expId]: _, ...remainingExperiences } = company.experiences;
    
    const updatedCompany = {
      ...company,
      experiences: remainingExperiences
    };
    
    setWorkHistory({
      ...workHistory,
      [companyId]: updatedCompany
    });
  }, [workHistory, setWorkHistory]);

  // 会社名を更新
  const handleUpdateCompanyName = useCallback((companyId: string, newName: string) => {
    const company = workHistory[companyId];
    
    setWorkHistory({
      ...workHistory,
      [companyId]: {
        ...company,
        companyName: newName
      }
    });
  }, [workHistory, setWorkHistory]);

  // 会社の期間を更新
  const handleUpdateCompanyPeriod = useCallback((companyId: string, field: 'start' | 'end', value: string) => {
    const company = workHistory[companyId];
    
    setWorkHistory({
      ...workHistory,
      [companyId]: {
        ...company,
        period: {
          ...company.period,
          [field]: value
        }
      }
    });
  }, [workHistory, setWorkHistory]);

  // 経験の期間を更新
  const handleUpdateExperiencePeriod = useCallback((companyId: string, expId: string, field: 'start' | 'end', value: string) => {
    const company = workHistory[companyId];
    const experience = company.experiences[expId];
    
    const updatedCompany = {
      ...company,
      experiences: {
        ...company.experiences,
        [expId]: {
          ...experience,
          period: {
            ...experience.period,
            [field]: value
          }
        }
      }
    };
    
    setWorkHistory({
      ...workHistory,
      [companyId]: updatedCompany
    });
  }, [workHistory, setWorkHistory]);

  // チーム人数を更新
  const handleUpdateTeamSize = useCallback((companyId: string, expId: string, value: string) => {
    const company = workHistory[companyId];
    const experience = company.experiences[expId];
    
    const updatedCompany = {
      ...company,
      experiences: {
        ...company.experiences,
        [expId]: {
          ...experience,
          organization: {
            ...experience.organization,
            teamSize: value
          }
        }
      }
    };
    
    setWorkHistory({
      ...workHistory,
      [companyId]: updatedCompany
    });
  }, [workHistory, setWorkHistory]);

  // 全体人数を更新
  const handleUpdateTotalSize = useCallback((companyId: string, expId: string, value: string) => {
    const company = workHistory[companyId];
    const experience = company.experiences[expId];
    
    const updatedCompany = {
      ...company,
      experiences: {
        ...company.experiences,
        [expId]: {
          ...experience,
          organization: {
            ...experience.organization,
            totalSize: value
          }
        }
      }
    };
    
    setWorkHistory({
      ...workHistory,
      [companyId]: updatedCompany
    });
  }, [workHistory, setWorkHistory]);

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■職務経歴</h2>
      {Object.keys(workHistory).map((companyId) => {
        const company = workHistory[companyId];
        
        return (
          <Box key={companyId} sx={{ mb: 4 }}>
            {/* 会社情報 */}
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid black',
                pb: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  勤務先：
                  {isEditMode ? (
                    <TextField
                      variant="standard"
                      defaultValue={company.companyName}
                      onChange={(e) => handleUpdateCompanyName(companyId, e.target.value)}
                    />
                  ) : (
                    company.companyName
                  )}
                  {isEditMode && (
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteCompany(companyId)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
                <Stack direction="row" alignItems="center">
                  <Box>勤務期間：</Box>
                  <FromToDatePicker
                    isEditMode={isEditMode}
                    period={company.period}
                    onChangeStart={(date) => handleUpdateCompanyPeriod(companyId, 'start', date)}
                    onChangeEnd={(date) => handleUpdateCompanyPeriod(companyId, 'end', date)}
                  />
                </Stack>
              </Box>
            </Stack>

            {/* 経験テーブル */}
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width={isEditMode ? 160 : 125}>期間</TableCell>
                  <TableCell width="auto">業務内容</TableCell>
                  <TableCell width={isEditMode ? 160 : 120}>環境・言語</TableCell>
                  <TableCell width={isEditMode ? 200 : 150}>組織・役割</TableCell>
                  {isEditMode && <TableCell>操作</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(company.experiences).map((expId) => {
                  const exp = company.experiences[expId];
                  
                  return (
                    <TableRow key={expId}>
                      {/* 期間 */}
                      <TableCell>
                        <FromToDatePicker
                          isEditMode={isEditMode}
                          period={exp.period}
                          direction="column"
                          onChangeStart={(date) => handleUpdateExperiencePeriod(companyId, expId, 'start', date)}
                          onChangeEnd={(date) => handleUpdateExperiencePeriod(companyId, expId, 'end', date)}
                        />
                      </TableCell>

                      {/* 業務内容 */}
                      <TableCell>
                        <Stack spacing={2}>
                          {/* プロジェクト名 */}
                          <TextFieldForWorkHistory
                            label="プロジェクト名"
                            subCategories="projectTitle"
                            mainCategories="businessDetails"
                            isEditMode={isEditMode}
                            companyId={companyId}
                            expId={expId}
                          />

                          {/* 概要 */}
                          <TextFieldForWorkHistory
                            label="概要"
                            subCategories="projectDescription"
                            mainCategories="businessDetails"
                            isEditMode={isEditMode}
                            companyId={companyId}
                            expId={expId}
                          />

                          {/* 担当業務 */}
                          <TextFieldForWorkHistory
                            label="担当業務"
                            subCategories="assignments"
                            mainCategories="businessDetails"
                            isEditMode={isEditMode}
                            companyId={companyId}
                            expId={expId}
                          />

                          {/* 実績・取り組み */}
                          <TextFieldForWorkHistory
                            label="実績・取り組み"
                            subCategories="achievements"
                            mainCategories="businessDetails"
                            isEditMode={isEditMode}
                            companyId={companyId}
                            expId={expId}
                          />
                        </Stack>
                      </TableCell>

                      {/* 環境・言語 */}
                      <TableCell>
                        <Stack spacing={2}>
                          {/* OS */}
                          <TextFieldForWorkHistory
                            label="OS"
                            subCategories="os"
                            mainCategories="technicalEnvironment"
                            isEditMode={isEditMode}
                            companyId={companyId}
                            expId={expId}
                          />

                          {/* 言語 */}
                          <TextFieldForWorkHistory
                            label="言語"
                            subCategories="language"
                            mainCategories="technicalEnvironment"
                            isEditMode={isEditMode}
                            companyId={companyId}
                            expId={expId}
                          />

                          {/* DB */}
                          <TextFieldForWorkHistory
                            label="DB"
                            subCategories="db"
                            mainCategories="technicalEnvironment"
                            isEditMode={isEditMode}
                            companyId={companyId}
                            expId={expId}
                          />

                          {/* その他 */}
                          <TextFieldForWorkHistory
                            label="その他"
                            subCategories="others"
                            mainCategories="technicalEnvironment"
                            isEditMode={isEditMode}
                            companyId={companyId}
                            expId={expId}
                          />
                        </Stack>
                      </TableCell>

                      {/* 組織・役割 */}
                      <TableCell>
                        <Stack spacing={2}>
                          <Stack>
                            <strong>【組織】</strong>
                            <Stack direction="row" alignItems="center">
                              <Box width={60}>チーム：</Box>
                              {isEditMode ? (
                                <TextField
                                  size="small"
                                  type="number"
                                  defaultValue={exp.organization.teamSize}
                                  onChange={(e) => handleUpdateTeamSize(companyId, expId, e.target.value)}
                                  sx={{width: '80px'}}
                                />
                              ) : (
                                exp.organization.teamSize
                              )}
                              <Box ml={0.5}>名</Box>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                              <Box>全体：</Box>
                              {isEditMode ? (
                                <TextField
                                  size="small"
                                  type="number"
                                  defaultValue={exp.organization.totalSize}
                                  onChange={(e) => handleUpdateTotalSize(companyId, expId, e.target.value)}
                                  sx={{width: '80px'}}
                                />
                              ) : (
                                exp.organization.totalSize
                              )}
                              <Box ml={0.5}>名</Box>
                            </Stack>
                          </Stack>

                          {/* 役割 */}
                          <TextFieldForWorkHistory
                            label="役割"
                            mainCategories="organization"
                            subCategories="roles"
                            isEditMode={isEditMode}
                            companyId={companyId}
                            expId={expId}
                          />
                        </Stack>
                      </TableCell>

                      {/* 操作 */}
                      {isEditMode && (
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteExperience(companyId, expId)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {isEditMode && (
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddExperience(companyId)}
                sx={{ mt: 2 }}
              >
                経験を追加
              </Button>
            )}
          </Box>
        );
      })}

      {isEditMode && (
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddCompany}
          variant="contained"
        >
          会社を追加
        </Button>
      )}
    </Box>
  );
};

export default React.memo(WorkHistory);
