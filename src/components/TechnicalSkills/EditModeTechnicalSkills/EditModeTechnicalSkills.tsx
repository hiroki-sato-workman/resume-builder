import {
  Box,
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
    const updatedSkills = technicalSkills.filter((_, i) => i !== index);
    onChange(updatedSkills);
  };

  const AddSkillButton = ({ category }: { category: string }) => {
    return (
      <IconButton
        size="small"
        onClick={() => handleAddSkill(category)}
        color="info"
      >
        <AddIcon/>
      </IconButton>
    )
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell width={250}>カテゴリ</TableCell>
          <TableCell width={200}>種別</TableCell>
          <TableCell width={150}>経験年数</TableCell>
          <TableCell width="auto">スキルレベル・備考</TableCell>
          <TableCell width={110}>操作</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(CATEGORIES).map(category => {
            const categorySkills = technicalSkills.filter(skill => skill.category === category);
            const filteredCategorySkills = technicalSkills.filter(skill => skill.category === category)
            return (
              <Fragment key={category}>
                <TableRow>
                  <TableCell rowSpan={categorySkills.length + 1}>
                    {category}
                  </TableCell>
                  {/* NOTE: スキル未設定の場合は空のセルで埋める */}
                  {filteredCategorySkills.length === 0 && (
                    <>
                      <TableCell/>
                      <TableCell/>
                      <TableCell/>
                      <TableCell>
                        <AddSkillButton category={category} />
                      </TableCell>
                    </>
                  )}
                </TableRow>
                {filteredCategorySkills.map((skill, index) => (
                  <TableRow key={`${category}-${index}`}>
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
                          sx={{mt: 1}}
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
                      <AddSkillButton category={category} />
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteSkill(technicalSkills.indexOf(skill))}
                        color="error"
                      >
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            )
          }
        )}
      </TableBody>
    </Table>
  )
}

export default EditModeTechnicalSkills;