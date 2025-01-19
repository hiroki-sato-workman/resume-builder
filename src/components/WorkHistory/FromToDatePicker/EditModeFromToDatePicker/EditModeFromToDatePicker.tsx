import {FC, useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import {PeriodType} from '../../../../types';
import {StyledStack} from '../../../../shared/components';
import {calculateDuration, CURRENT} from '../../../../services/date.service';

interface Props {
  period: PeriodType
  onChangeStart: (date: string) => void
  onChangeEnd: (date: string) => void
  direction?: 'row' | 'column'
}

const EditModeFromToDatePicker: FC<Props> = ({
  period,
  onChangeStart,
  onChangeEnd,
  direction = 'row',
}) => {
  const [isCurrent, setIsCurrent] = useState<boolean>(() => period.end === CURRENT)
  const isRow = direction === 'row'

  const handleSelectCurrent = () => {
    setIsCurrent(true)
    onChangeEnd(CURRENT)
  }

  return (
    <>
      <StyledStack direction={direction}>
        {/* 開始日 */}
        <TextField
          fullWidth
          size="small"
          type="month"
          variant={isRow ? 'standard' : 'outlined'}
          defaultValue={period.start}
          onChange={(e) => onChangeStart(e.target.value)}
        />
        <Box sx={{ textAlign: 'center' }}>～</Box>

        {/* 終了日 */}
        {isCurrent
          ? <Box sx={{ display: 'flex', width: '60px', justifyContent: 'center'}}>{period.end}</Box>
          : <TextField
              fullWidth
              size="small"
              type="month"
              variant={isRow ? 'standard' : 'outlined'}
              defaultValue={period.end}
              onChange={(e) => onChangeEnd(e.target.value)}
            />
        }

        {/* 年月選択・現在切り替えボタン */}
        {isCurrent
          ? <Button onClick={() => setIsCurrent(false)}>入力</Button>
          : <Button onClick={handleSelectCurrent}>現在</Button>
        }

        {/* 期間 */}
        {!isRow && `（${calculateDuration(period)}）`}
      </StyledStack>
    </>
  )
}

export default EditModeFromToDatePicker;