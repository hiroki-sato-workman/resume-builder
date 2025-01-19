import { FC, useState } from 'react';
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
import { WorkCompany } from '../../types';
import {getSpecifiedStoredResumeData, saveStoredResumeData} from '../../services/storage.service';
import FromToDatePicker from './FromToDatePicker';
import {INITIAL_WORK_COMPANY, INITIAL_WORK_HISTORY} from './WorkHistory.constant';
import TextFieldForWorkHistory from './TextFieldForWorkHistory';

interface Props {
  isEditMode: boolean;
}

const WorkHistory: FC<Props> = ({ isEditMode }) => {
  const [workHistory, setWorkHistory] = useState<WorkCompany[]>(() => getSpecifiedStoredResumeData('workHistory'));

  const handleChangeWorkHistoryData = (workHistory: WorkCompany[]) => {
    setWorkHistory(workHistory)
    saveStoredResumeData('workHistory', workHistory)
  }

  const handleAddCompany = () => {
    handleChangeWorkHistoryData([...workHistory, INITIAL_WORK_COMPANY]);
  };

  const handleDeleteCompany = (companyIndex: number) => {
    const newHistory = workHistory.filter((_, index) => index !== companyIndex);
    handleChangeWorkHistoryData(newHistory);
  };

  const handleAddExperience = (companyIndex: number) => {
    const newHistory = [...workHistory];
    newHistory[companyIndex].experiences.push(INITIAL_WORK_HISTORY);
    handleChangeWorkHistoryData(newHistory);
  };

  const handleDeleteExperience = (companyIndex: number, expIndex: number) => {
    const newHistory = [...workHistory];
    newHistory[companyIndex].experiences = newHistory[companyIndex].experiences.filter((_, index) => index !== expIndex);
    handleChangeWorkHistoryData(newHistory);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■職務経歴</h2>
      {workHistory.map((company, companyIndex) => (
        <Box key={companyIndex} sx={{ mb: 4 }}>
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
                    onChange={(e) => {
                      const newHistory = [...workHistory];
                      newHistory[companyIndex].companyName = e.target.value;
                      handleChangeWorkHistoryData(newHistory);
                    }}
                  />
                ) : (
                  company.companyName
                )}
                {isEditMode && (
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteCompany(companyIndex)}
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
                  onChangeStart={(date) => {
                    const newHistory = [...workHistory];
                    newHistory[companyIndex].period.start = date;
                    handleChangeWorkHistoryData(newHistory);
                  }}
                  onChangeEnd={(date) => {
                    const newHistory = [...workHistory];
                    newHistory[companyIndex].period.end = date;
                    handleChangeWorkHistoryData(newHistory);
                  }}
                />
              </Stack>
            </Box>
          </Stack>

          {/* 経験テーブル */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width={isEditMode ? 160 : 120}>期間</TableCell>
                <TableCell width="auto">業務内容</TableCell>
                <TableCell width={isEditMode ? 160 : 120}>環境・言語</TableCell>
                <TableCell width={isEditMode ? 200 : 150}>組織・役割</TableCell>
                {isEditMode && <TableCell>操作</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {company.experiences.map((exp, expIndex) => (
                <TableRow key={expIndex}>
                  {/* 期間 */}
                  <TableCell>
                    <FromToDatePicker
                      isEditMode={isEditMode}
                      period={exp.period}
                      direction="column"
                      onChangeStart={(date) => {
                        const newHistory = [...workHistory];
                        newHistory[companyIndex].experiences[expIndex].period.start = date;
                        handleChangeWorkHistoryData(newHistory);
                      }}
                      onChangeEnd={(date) => {
                        const newHistory = [...workHistory];
                        newHistory[companyIndex].experiences[expIndex].period.end = date;
                        handleChangeWorkHistoryData(newHistory);
                      }}
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
                        companyIndex={companyIndex}
                        expIndex={expIndex}
                        onChangeWorkHistory={handleChangeWorkHistoryData}
                      />

                      {/* 概要 */}
                      <TextFieldForWorkHistory
                        label="概要"
                        subCategories="projectDescription"
                        mainCategories="businessDetails"
                        isEditMode={isEditMode}
                        companyIndex={companyIndex}
                        expIndex={expIndex}
                        onChangeWorkHistory={handleChangeWorkHistoryData}
                      />

                      {/* 担当フェーズ */}
                      <TextFieldForWorkHistory
                        label="担当フェーズ"
                        subCategories="assignments"
                        mainCategories="businessDetails"
                        isEditMode={isEditMode}
                        companyIndex={companyIndex}
                        expIndex={expIndex}
                        onChangeWorkHistory={handleChangeWorkHistoryData}
                      />

                      {/* 実績・取り組み */}
                      <TextFieldForWorkHistory
                        label="実績・取り組み"
                        subCategories="achievements"
                        mainCategories="businessDetails"
                        isEditMode={isEditMode}
                        companyIndex={companyIndex}
                        expIndex={expIndex}
                        onChangeWorkHistory={handleChangeWorkHistoryData}
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
                        companyIndex={companyIndex}
                        expIndex={expIndex}
                        onChangeWorkHistory={handleChangeWorkHistoryData}
                      />

                      {/* 言語 */}
                      <TextFieldForWorkHistory
                        label="言語"
                        subCategories="language"
                        mainCategories="technicalEnvironment"
                        isEditMode={isEditMode}
                        companyIndex={companyIndex}
                        expIndex={expIndex}
                        onChangeWorkHistory={handleChangeWorkHistoryData}
                      />

                      {/* DB */}
                      <TextFieldForWorkHistory
                        label="DB"
                        subCategories="db"
                        mainCategories="technicalEnvironment"
                        isEditMode={isEditMode}
                        companyIndex={companyIndex}
                        expIndex={expIndex}
                        onChangeWorkHistory={handleChangeWorkHistoryData}
                      />

                      {/* その他 */}
                      <TextFieldForWorkHistory
                        label="その他"
                        subCategories="others"
                        mainCategories="technicalEnvironment"
                        isEditMode={isEditMode}
                        companyIndex={companyIndex}
                        expIndex={expIndex}
                        onChangeWorkHistory={handleChangeWorkHistoryData}
                      />
                    </Stack>
                  </TableCell>

                  {/* 組織・役割 */}
                  <TableCell>
                    <Stack spacing={2}>
                      <strong>【組織】</strong>
                      <Stack direction="row" sx={{ mt: 1 }} alignItems="center">
                        <Box width={60}>チーム：</Box>
                        {isEditMode ? (
                          <TextField
                            size="small"
                            type="number"
                            defaultValue={exp.organization.teamSize}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].organization.teamSize = e.target.value;
                              handleChangeWorkHistoryData(newHistory);
                            }}
                            sx={{ width: '80px' }}
                          />
                        ) : (
                          exp.organization.teamSize
                        )}
                        <Box ml={0.5}>名</Box>
                      </Stack>
                      <Stack direction="row" sx={{ mt: 1 }} alignItems="center">
                        <Box>全体：</Box>
                        {isEditMode ? (
                          <TextField
                            size="small"
                            type="number"
                            defaultValue={exp.organization.totalSize}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].organization.totalSize = e.target.value;
                              handleChangeWorkHistoryData(newHistory);
                            }}
                            sx={{ width: '80px' }}
                          />
                        ) : (
                          exp.organization.totalSize
                        )}
                        <Box ml={0.5}>名</Box>
                      </Stack>

                      {/* 役割 */}
                      <TextFieldForWorkHistory
                        label="役割"
                        mainCategories="organization"
                        subCategories="roles"
                        isEditMode={isEditMode}
                        companyIndex={companyIndex}
                        expIndex={expIndex}
                        onChangeWorkHistory={handleChangeWorkHistoryData}
                      />
                    </Stack>
                  </TableCell>

                  {/* 操作 */}
                  {isEditMode && (
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteExperience(companyIndex, expIndex)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {isEditMode && (
            <Button
              startIcon={<AddIcon />}
              onClick={() => handleAddExperience(companyIndex)}
              sx={{ mt: 2 }}
            >
              経験を追加
            </Button>
          )}
        </Box>
      ))}

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

export default WorkHistory;