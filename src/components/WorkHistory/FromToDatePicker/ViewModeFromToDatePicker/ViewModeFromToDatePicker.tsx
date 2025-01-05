import {FC} from 'react';
import { Box } from '@mui/material';
import {PeriodType} from '../../../../types';
import {CURRENT} from '../../WorkHistory.constant';
import { StyledStack } from '../../../../shared/components';
import {calculateDuration} from '../../../../services/calculateDuration.service';

interface Props {
  period: PeriodType
  direction?: 'row' | 'column'
}

const ViewModeFromToDatePicker: FC<Props> = ({  period, direction = 'row'}) => {
  // 日付を表示用にフォーマット
  const formatDate = (dateStr: string) => {
    if (dateStr === CURRENT) return dateStr
    const [year, month] = dateStr.split('-');
    return `${year}年${parseInt(month)}月`;
  };

  return (
    <>
      <StyledStack direction={direction}>
        <Box>{formatDate(period.start)}</Box>
        <Box>～</Box>
        <Box>{formatDate(period.end)}</Box>
        {/* 期間 */}
        {`（${calculateDuration(period)}）`}
      </StyledStack>
    </>
  )
}

export default ViewModeFromToDatePicker;