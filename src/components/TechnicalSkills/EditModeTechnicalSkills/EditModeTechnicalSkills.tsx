import {
  Button,
  IconButton,
  MenuItem,
  Select, Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import {CATEGORIES, EXPERIENCE_YEARS, SKILL_LEVELS} from '../TechnicalSkills.constant';
import {FC, Fragment} from 'react';
import {Add as AddIcon, Delete as DeleteIcon} from '@mui/icons-material';
import {TechnicalSkill} from '../../../types';

interface Props {
  technicalSkills: TechnicalSkill[];
  onChange: (skills: TechnicalSkill[]) => void;
}

const EditModeTechnicalSkills: FC<Props> = ({technicalSkills, onChange}: Props) => {
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

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>カテゴリ</TableCell>
          <TableCell>種別</TableCell>
          <TableCell>経験年数</TableCell>
          <TableCell>スキルレベル・備考</TableCell>
          <TableCell>操作</TableCell>
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
                        defaultValue={skill.type}
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
                        defaultValue={skill.type}
                        onChange={(e) => handleUpdateSkill(technicalSkills.indexOf(skill), 'type', e.target.value)}
                      />
                    )}
                    {category === 'DB' && skill.type === 'その他' && (
                      <TextField
                        fullWidth
                        size="small"
                        defaultValue={skill.otherType || ''}
                        onChange={(e) => handleUpdateSkill(technicalSkills.indexOf(skill), 'otherType', e.target.value)}
                        sx={{ mt: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      fullWidth
                      size="small"
                      defaultValue={skill.years}
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
                        defaultValue={skill.level}
                        onChange={(e) => handleUpdateSkill(technicalSkills.indexOf(skill), 'level', e.target.value)}
                      />
                    ) : (
                      <Select
                        fullWidth
                        size="small"
                        defaultValue={skill.level}
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
  )
}

export default EditModeTechnicalSkills;