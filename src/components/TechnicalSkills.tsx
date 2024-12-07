import { Fragment, FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box,
  Select,
  MenuItem,
  Button,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface TechnicalSkill {
  category: string;
  type: string;
  otherType?: string;
  years: string;
  level: string;
}

interface Props {
  technicalSkills: TechnicalSkill[];
  onChange: (skills: TechnicalSkill[]) => void;
  isEditMode: boolean;
}

const CATEGORIES = {
  '担当業務': [
    '要件定義',
    '基本設計',
    '詳細設計',
    '実装',
    'テスト',
    '保守運用'
  ],
  'OS': [
    'Windows',
    'Linux',
    'Unix',
    'MacOS',
    'CentOS',
    'iOS',
    'Android'
  ],
  '言語': [],
  'フレームワーク': [],
  'DB': [
    'MySQL',
    'Oracle',
    'SQL Server',
    'PostgreSQL',
    'DB2',
    'SQLite',
    'Leaflet',
    'QGIS',
    'DynamoDB',
    'その他'
  ],
  'その他ネットワーク、クラウド等': []
};

const EXPERIENCE_YEARS = [
  '半年',
  '1年', '2年', '3年', '4年', '5年',
  '6年', '7年', '8年', '9年', '10年以上'
];

const SKILL_LEVELS = [
  '通常使用に問題なしで、指導も可能',
  '通常使用に問題なし',
  '調べながらであれば作業可能',
  '自己研鑽',
  '大学で使用'
];

const TechnicalSkills: FC<Props> = ({
                                            technicalSkills,
                                            onChange,
                                            isEditMode
                                          }) => {
  const handleAddSkill = (category: string) => {
    const newSkill: TechnicalSkill = {
      category,
      type: '',
      years: '半年',
      level: category === '担当業務' ? '' : '自己研鑽'
    };
    onChange([...technicalSkills, newSkill]);
  };

  const handleUpdateSkill = (index: number, field: keyof TechnicalSkill, value: string) => {
    const updatedSkills = [...technicalSkills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    onChange(updatedSkills);
  };

  const handleDeleteSkill = (index: number) => {
    const skillToDelete = technicalSkills[index];
    const remainingSkillsInCategory = technicalSkills.filter(
      (s, i) => i !== index && s.category === skillToDelete.category
    );

    if (remainingSkillsInCategory.length === 0) {
      return;
    }

    const updatedSkills = technicalSkills.filter((_, i) => i !== index);
    onChange(updatedSkills);
  };

  const renderEditMode = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>カテゴリ</TableCell>
          <TableCell>種別</TableCell>
          <TableCell>経験年数</TableCell>
          <TableCell>スキルレベル・備考</TableCell>
          {isEditMode && <TableCell>操作</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(CATEGORIES).map(category => (
          <Fragment key={category}>
            <TableRow>
              <TableCell>{category}</TableCell>
              <TableCell colSpan={4}>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddSkill(category)}
                  size="small"
                >
                  {category}を追加
                </Button>
              </TableCell>
            </TableRow>
            {technicalSkills
              .filter(skill => skill.category === category)
              .map((skill, index) => (
                <TableRow key={`${category}-${index}`}>
                  <TableCell />
                  <TableCell>
                    {CATEGORIES[category as keyof typeof CATEGORIES].length > 0 ? (
                      <Select
                        fullWidth
                        size="small"
                        value={skill.type}
                        onChange={(e) => handleUpdateSkill(technicalSkills.indexOf(skill), 'type', e.target.value)}
                      >
                        {CATEGORIES[category as keyof typeof CATEGORIES].map(option => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <TextField
                        fullWidth
                        size="small"
                        value={skill.type}
                        onChange={(e) => handleUpdateSkill(technicalSkills.indexOf(skill), 'type', e.target.value)}
                      />
                    )}
                    {category === 'DB' && skill.type === 'その他' && (
                      <TextField
                        fullWidth
                        size="small"
                        value={skill.otherType || ''}
                        onChange={(e) => handleUpdateSkill(technicalSkills.indexOf(skill), 'otherType', e.target.value)}
                        sx={{ mt: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      fullWidth
                      size="small"
                      value={skill.years}
                      onChange={(e) => handleUpdateSkill(technicalSkills.indexOf(skill), 'years', e.target.value)}
                    >
                      {EXPERIENCE_YEARS.map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    {category === '担当業務' ? (
                      <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        value={skill.level}
                        onChange={(e) => handleUpdateSkill(technicalSkills.indexOf(skill), 'level', e.target.value)}
                      />
                    ) : (
                      <Select
                        fullWidth
                        size="small"
                        value={skill.level}
                        onChange={(e) => handleUpdateSkill(technicalSkills.indexOf(skill), 'level', e.target.value)}
                      >
                        {SKILL_LEVELS.map(level => (
                          <MenuItem key={level} value={level}>{level}</MenuItem>
                        ))}
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    {technicalSkills.filter(s => s.category === category).length > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteSkill(technicalSkills.indexOf(skill))}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );

  const renderViewMode = () => (
    <Table size="small">
      <TableHead>
        <TableRow
          sx={{
            border: '1px solid rgba(224, 224, 224, 1)',
            backgroundColor: 'lightgray !important'
        }}
        >
          <TableCell width={175} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
            カテゴリ
          </TableCell>
          <TableCell width={120} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
            種別
          </TableCell>
          <TableCell width={100} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
            経験年数
          </TableCell>
          <TableCell>
            スキルレベル
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(CATEGORIES).map(category => {
          const categorySkills = technicalSkills.filter(skill => skill.category === category);
          return categorySkills?.map((skill, index) => (
            <TableRow
              key={`${category}-${index}`}
              sx={{
                border: '1px solid rgba(224, 224, 224, 1)',
              }}>
              {index === 0 && (
                <TableCell
                  rowSpan={categorySkills.length}
                  sx={{
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                    borderBottom: 'none',
                    verticalAlign: 'top'
                  }}
                >
                  {category}
                </TableCell>
              )}
              <TableCell sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)',
                borderBottom: 'none',
                verticalAlign: 'top'
              }}>
                {skill.type === 'その他' ? skill.otherType : skill.type}
              </TableCell>
              <TableCell sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)',
                borderBottom: 'none',
                verticalAlign: 'top'
              }}>
                {skill.years}
              </TableCell>
              <TableCell sx={{
                borderTop: index === 0 ? '1px solid rgba(224, 224, 224, 1)' : 'none',
                borderBottom: 'none',
                verticalAlign: 'top'
              }}>
                {skill.level}
              </TableCell>
            </TableRow>
          ));
        })}
      </TableBody>
    </Table>
  );

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■PCスキル/テクニカルスキル</h2>
      {isEditMode ? renderEditMode() : renderViewMode()}
    </Box>
  );
};

export default TechnicalSkills;