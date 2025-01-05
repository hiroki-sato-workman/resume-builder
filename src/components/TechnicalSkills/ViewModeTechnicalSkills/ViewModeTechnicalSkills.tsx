import {Box, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
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
        <TableRow>
          <TableCell>
            カテゴリ
          </TableCell>
          <TableCell>
            種別
          </TableCell>
          <TableCell>
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
            <TableRow key={`${category}-${index}`}>
              {index === 0 && (
                <TableCell
                  rowSpan={categorySkills.length}
                >
                  {category}
                </TableCell>
              )}
              <TableCell>
                {skill.type === 'その他' ? skill.otherType : skill.type}
              </TableCell>
              <TableCell>
                {skill.years}
              </TableCell>
              <TableCell>
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
