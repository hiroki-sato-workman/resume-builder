import { FC } from 'react'
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

interface WorkExperience {
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
}

interface WorkCompany {
  companyName: string;
  period: {
    start: string;
    end: string;
  };
  capital: number;
  employees: number;
  experiences: WorkExperience[];
}

interface Props {
  workHistory: WorkCompany[];
  onChange: (history: WorkCompany[]) => void;
  isEditMode: boolean;
}

const ROLES = [
  'メンバー',
  'サブリーダー',
  'チームリーダー',
  'プロジェクトリーダー',
  'プロジェクトマネージャー'
];

const StyledTableCell = (props: TableCellProps) => (
  <TableCell
    sx={{
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      verticalAlign: 'top',
      p: 2,
    }}
    {...props}
  />
);

const WorkHistory: FC<Props> = ({ workHistory, onChange, isEditMode }) => {
  const handleAddCompany = () => {
    onChange([...workHistory, {
      companyName: '',
      period: { start: '', end: '現在' },
      capital: 0,
      employees: 0,
      experiences: []
    }]);
  };

  const handleDeleteCompany = (companyIndex: number) => {
    const newHistory = workHistory.filter((_, index) => index !== companyIndex);
    onChange(newHistory);
  };

  const handleAddExperience = (companyIndex: number) => {
    const newHistory = [...workHistory];
    newHistory[companyIndex].experiences.push({
      period: { start: '', end: '' },
      projectContent: [],
      assignments: [],
      organization: {
        teamSize: '',
        totalSize: '',
        roles: []
      },
      technicalEnvironment: []
    });
    onChange(newHistory);
  };

  const handleDeleteExperience = (companyIndex: number, expIndex: number) => {
    const newHistory = [...workHistory];
    newHistory[companyIndex].experiences = newHistory[companyIndex].experiences.filter((_, index) => index !== expIndex);
    onChange(newHistory);
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
                    value={company.companyName}
                    onChange={(e) => {
                      const newHistory = [...workHistory];
                      newHistory[companyIndex].companyName = e.target.value;
                      onChange(newHistory);
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
                      value={company.period.start}
                      onChange={(e) => {
                        const newHistory = [...workHistory];
                        newHistory[companyIndex].period.start = e.target.value;
                        onChange(newHistory);
                      }}
                      placeholder="YYYY年M月"
                      sx={{ width: '100px' }}
                    />
                    <Box sx={{ mx: 1, textAlign: 'center' }}>～</Box>
                    <TextField
                      variant="standard"
                      value={company.period.end}
                      onChange={(e) => {
                        const newHistory = [...workHistory];
                        newHistory[companyIndex].period.end = e.target.value;
                        onChange(newHistory);
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

            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box>
                ◆資本金{isEditMode ? (
                  <TextField
                    variant="standard"
                    type="number"
                    value={company.capital}
                    onChange={(e) => {
                      const newHistory = [...workHistory];
                      newHistory[companyIndex].capital = Number(e.target.value);
                      onChange(newHistory);
                    }}
                    sx={{ width: '100px' }}
                  />
                ) : (
                  company.capital
                )}
                千万円
              </Box>
              <Box>
                ◆従業員数：
                {isEditMode ? (
                  <TextField
                    variant="standard"
                    type="number"
                    value={company.employees}
                    onChange={(e) => {
                      const newHistory = [...workHistory];
                      newHistory[companyIndex].employees = Number(e.target.value);
                      onChange(newHistory);
                    }}
                    sx={{ width: '100px' }}
                  />
                ) : (
                  company.employees
                )}
                名
              </Box>
            </Box>
          </Stack>

          {/* 経験テーブル */}
          <Table size="small" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
            <TableHead>
              <TableRow>
                <StyledTableCell width={isEditMode ? 160 : 120}>期間</StyledTableCell>
                <StyledTableCell width={isEditMode ? 450 : 360}>業務内容</StyledTableCell>
                <StyledTableCell width={isEditMode ? 400 : 250}>組織/役割</StyledTableCell>
                {isEditMode && <StyledTableCell>操作</StyledTableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {company.experiences.map((exp, expIndex) => (
                <TableRow key={expIndex}>
                  <StyledTableCell>
                    {isEditMode ? (
                      <Stack spacing={1} alignItems="center">
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="YYYY年M月"
                          value={exp.period.start}
                          onChange={(e) => {
                            const newHistory = [...workHistory];
                            newHistory[companyIndex].experiences[expIndex].period.start = e.target.value;
                            onChange(newHistory);
                          }}
                        />
                        <Box sx={{ textAlign: 'center' }}>～</Box>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="YYYY年M月"
                          value={exp.period.end}
                          onChange={(e) => {
                            const newHistory = [...workHistory];
                            newHistory[companyIndex].experiences[expIndex].period.end = e.target.value;
                            onChange(newHistory);
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
                  </StyledTableCell>

                  <StyledTableCell>
                    <Stack spacing={2}>
                      <Box>
                        <strong>【プロジェクト内容】</strong>
                        {isEditMode ? (
                          <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            value={exp.projectContent.join('\n')}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].projectContent =
                                e.target.value.split('\n');
                              onChange(newHistory);
                            }}
                          />
                        ) : (
                          <ul>
                            {exp.projectContent.map((content, i) => (
                              <li key={i}>{content}</li>
                            ))}
                          </ul>
                        )}
                      </Box>
                      <Box>
                        <strong>【担当業務】</strong>
                        {isEditMode ? (
                          <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            value={exp.assignments.join('\n')}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].assignments =
                                e.target.value.split('\n');
                              onChange(newHistory);
                            }}
                          />
                        ) : (
                          <ul>
                            {exp.assignments.map((assignment, i) => (
                              <li key={i}>{assignment}</li>
                            ))}
                          </ul>
                        )}
                      </Box>
                    </Stack>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Stack spacing={2}>
                      <Stack>
                        <strong>【組織】</strong>
                        <Stack direction="row" sx={{ mt: 1 }} alignItems="center">
                          <Box width={60}>チーム：</Box>
                          {isEditMode ? (
                            <TextField
                              size="small"
                              value={exp.organization.teamSize}
                              onChange={(e) => {
                                const newHistory = [...workHistory];
                                newHistory[companyIndex].experiences[expIndex].organization.teamSize = e.target.value;
                                onChange(newHistory);
                              }}
                              sx={{ width: '100px' }}
                            />
                          ) : (
                            exp.organization.teamSize
                          )}
                          <Box ml={1}>名</Box>
                        </Stack>
                        <Stack direction="row" sx={{ mt: 1 }} alignItems="center">
                          <Box width={60}>全体：</Box>
                          {isEditMode ? (
                            <TextField
                              size="small"
                              value={exp.organization.totalSize}
                              onChange={(e) => {
                                const newHistory = [...workHistory];
                                newHistory[companyIndex].experiences[expIndex].organization.totalSize = e.target.value;
                                onChange(newHistory);
                              }}
                              sx={{ width: '100px' }}
                            />
                          ) : (
                            exp.organization.totalSize
                          )}
                          <Box ml={1}>名</Box>
                        </Stack>
                      </Stack>

                      <Box>
                        <strong>【役割】</strong>
                        {isEditMode ? (
                          <Select
                            multiple
                            fullWidth
                            size="small"
                            value={exp.organization.roles}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].organization.roles =
                                e.target.value as string[];
                              onChange(newHistory);
                            }}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as string[]).map((value) => (
                                  <Chip key={value} label={value} size="small" />
                                ))}
                              </Box>
                            )}
                          >
                            {ROLES.map((role) => (
                              <MenuItem key={role} value={role}>
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
                            value={exp.technicalEnvironment.join('\n')}
                            onChange={(e) => {
                              const newHistory = [...workHistory];
                              newHistory[companyIndex].experiences[expIndex].technicalEnvironment =
                                e.target.value.split('\n');
                              onChange(newHistory);
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
                  </StyledTableCell>

                  {isEditMode && (
                    <StyledTableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteExperience(companyIndex, expIndex)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
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