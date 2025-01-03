import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {TechnicalSkill} from '../../../types';
import {CATEGORIES} from '../TechnicalSkills.constant';
import {FC} from 'react';

interface Props {
  technicalSkills: TechnicalSkill[];
}

const ViewModeTechnicalSkills: FC<Props> = ({ technicalSkills }: Props) => {
  return (
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
  )
}

export default ViewModeTechnicalSkills;
