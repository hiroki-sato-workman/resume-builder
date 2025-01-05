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
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {TableCellProps} from '@mui/material/TableCell/TableCell';
import {Role, WorkCompany} from '../../types';
import {getSpecifiedStoredResumeData, saveStoredResumeData} from '../../services/storage.service';

const ROLES: Role[] = [
  'メンバー',
  'サブリーダー',
  'チームリーダー',
  'プロジェクトリーダー',
  'プロジェクトマネージャー'
];

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
    handleChangeWorkHistoryData([...workHistory, {
      companyName: '',
      period: { start: '', end: '現在' },
      experiences: []
    }]);
  };

  const handleDeleteCompany = (companyIndex: number) => {
    const newHistory = workHistory.filter((_, index) => index !== companyIndex);
    handleChangeWorkHistoryData(newHistory);
  };

  const handleAddExperience = (companyIndex: number) => {
    const newHistory = [...workHistory];
    newHistory[companyIndex].experiences.push({
      period: { start: '', end: '' },
      projectTitle: '',
      projectDescription: '',
      assignments: [],
      achievements: '',
      organization: {
        teamSize: '',
        totalSize: '',
        roles: []
      },
      technicalEnvironment: []
    });
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
              <Box>
                (勤務期間：
                {isEditMode ? (
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <TextField
                      variant="standard"
                      defaultValue={company.period.start}
                      onChange={(e) => {
                        const newHistory = [...workHistory];
                        newHistory[companyIndex].period.start = e.target.value;
                        handleChangeWorkHistoryData(newHistory);
                      }}
                      placeholder="YYYY年M月"
                      sx={{ width: '100px' }}
                    />
                    <Box sx={{ mx: 1, textAlign: 'center' }}>～</Box>
                    <TextField
                      variant="standard"
                      defaultValue={company.period.end}
                      onChange={(e) => {
                        const newHistory = [...workHistory];
                        newHistory[companyIndex].period.end = e.target.value;
                        handleChangeWorkHistoryData(newHistory);
                      }}
                      placeholder="現在 or YYYY年M月"
                      sx={{ width: '100px' }}
                    />
                  </Box>
                ) : (
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span>{company.period.start}</span>
                    <span style={{ margin: '0 8px' }}>～</span>
                    <span>{company.period.end}</span>
                  </Box>
                )}
                )
              </Box>
            </Box>
          </Stack>

          {/* 経験テーブル */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width={isEditMode ? 160 : 120}>期間</TableCell>
                <TableCell width={isEditMode ? 450 : 360}>業務内容</TableCell>
                <TableCell width={isEditMode ? 400 : 250}>組織/役割</TableCell>
                {isEditMode && <TableCell>操作</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {company.experiences.map((exp, expIndex) => (
                <TableRow
                  key={expIndex}
                  sx={{
                    border: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <TableCell>
                    {isEditMode ? (
                      <Stack spacing={1} alignItems="center">
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="YYYY年M月"
                          defaultValue={exp.period.start}
                          onChange={(e) => {
                            const newHistory = [...workHistory];
                            newHistory[companyIndex].experiences[expIndex].period.start = e.target.value;
                            handleChangeWorkHistoryData(newHistory);
                          }}
                        />
                        <Box sx={{ textAlign: 'center' }}>～</Box>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="YYYY年M月"
                          defaultValue={exp.period.end}
                          onChange={(e) => {
                            const newHistory = [...workHistory];
                            newHistory[companyIndex].experiences[expIndex].period.end = e.target.value;
                            handleChangeWorkHistoryData(newHistory);
                          }}
                        />
                      </Stack>
                    ) : (
                      <Stack alignItems="center">
                        <Box>{exp.period.start}</Box>
                        <Box>～</Box>
                        <Box>{exp.period.end}</Box>
                      </Stack>
                    )}
                  </TableCell>

                  <TableCell>
                    <Stack spacing={2}>
                      <Stack>
                        <strong>【プロジェクト名】</strong>
                        {isEditMode ? (
                          <TextField
                            size="small"
                            fullWidth
                            defaultValue={exp.projectTitle}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].projectTitle = e.target.value;
                              handleChangeWorkHistoryData(newHistory);
                            }}
                          />
                        ) : (exp.projectTitle)}
                      </Stack>

                      <Stack>
                        <strong>【概要】</strong>
                        {isEditMode ? (
                          <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            defaultValue={exp.projectDescription}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].projectDescription = e.target.value;
                              handleChangeWorkHistoryData(newHistory);
                            }}
                          />
                        ) : (exp.projectDescription)}
                      </Stack>

                      <Stack>
                        <strong>【担当フェーズ】</strong>
                        {isEditMode ? (
                          <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            defaultValue={exp.assignments.join('\n')}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].assignments =
                                e.target.value.split('\n');
                              handleChangeWorkHistoryData(newHistory);
                            }}
                          />
                        ) : (
                          <ul>
                            {exp.assignments.map((assignment, i) => (
                              <li key={i}>{assignment}</li>
                            ))}
                          </ul>
                        )}
                      </Stack>

                      <Stack>
                        <strong>【実績・取り組み】</strong>
                        {isEditMode ? (
                          <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            defaultValue={exp.achievements}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].achievements = e.target.value;
                              handleChangeWorkHistoryData(newHistory);
                            }}
                          />
                        ) : (exp.achievements)}
                      </Stack>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack spacing={2}>
                      <Stack>
                        <strong>【組織】</strong>
                        <Stack direction="row" spacing={2}>
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
                        </Stack>
                      </Stack>

                      <Box>
                        <strong>【役割】</strong>
                        {isEditMode ? (
                          <Select
                            multiple
                            fullWidth
                            size="small"
                            defaultValue={exp.organization.roles}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].organization.roles =
                                e.target.value as Role[];
                                handleChangeWorkHistoryData(newHistory);
                            }}
                           // FIXME: 値がレンダリングされない & 値が変更できない問題を修正
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as string[]).map((value) => (
                                  <Chip key={value} label={value} size="small" />
                                ))}
                              </Box>
                            )}
                          >
                            {ROLES.map((role) => (
                              <MenuItem key={role} defaultValue={role}>
                                {role}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          <div>{exp.organization.roles.join(' / ')}</div>
                        )}
                      </Box>

                      <Box>
                        <strong>【言語・環境】</strong>
                        {isEditMode ? (
                          <TextField
                            fullWidth
                            multiline
                            defaultValue={exp.technicalEnvironment.join('\n')}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].technicalEnvironment =
                                e.target.value.split('\n');
                                handleChangeWorkHistoryData(newHistory);
                            }}
                          />
                        ) : (
                          <ul>
                            {exp.technicalEnvironment.map((tech, i) => (
                              <li key={i}>{tech}</li>
                            ))}
                          </ul>
                        )}
                      </Box>
                    </Stack>
                  </TableCell>

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