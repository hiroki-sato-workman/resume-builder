import { FC } from 'react';
import { PeriodType } from '../../../types';
import ViewModeFromToDatePicker from './ViewModeFromToDatePicker';
import EditModeFromToDatePicker from './EditModeFromToDatePicker';

interface Props {
  isEditMode: boolean;
  period: PeriodType
  onChangeStart: (date: string) => void
  onChangeEnd: (date: string) => void
  direction?: 'row' | 'column'
  isDisplayCurrent?: boolean,
}

const FromToDatePicker: FC<Props> = ({
  isEditMode, period,
  onChangeStart,
  onChangeEnd,
  direction,
}) => {
  return (
    <>
      {isEditMode ? (
        <EditModeFromToDatePicker
          period={period}
          onChangeStart={onChangeStart}
          onChangeEnd={onChangeEnd}
          direction={direction}
        />
      ) : (
        <ViewModeFromToDatePicker period={period} direction={direction} />
      )}
    </>
  )
}

export default FromToDatePicker;