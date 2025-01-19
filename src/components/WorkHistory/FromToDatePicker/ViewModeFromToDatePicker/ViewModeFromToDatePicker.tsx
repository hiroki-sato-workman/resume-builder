import {FC} from 'react';
import { Box } from '@mui/material';
import {PeriodType} from '../../../../types';
import {calculateDuration, formatDate} from '../../../../services/date.service';
import { StyledStack } from '../../../../shared/components';

interface Props {
  period: PeriodType
  direction?: 'row' | 'column'
}

const ViewModeFromToDatePicker: FC<Props> = ({  period, direction = 'row'}) => {
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