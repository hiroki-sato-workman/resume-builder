import { SxProps } from '@mui/system';

export const getViewModeStyles = (isEditMode: boolean): { [key: string]: SxProps } => ({
  textField: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: isEditMode ? undefined : 'none'
    },
    '& .MuiInputBase-input': {
      padding: isEditMode ? undefined : '0',
      '-webkit-text-fill-color': 'rgba(0, 0, 0, 1)',
    },
    '& .MuiInput-underline:before': {
      borderBottom: isEditMode ? undefined : 'none'
    },
    '& .MuiInput-underline:after': {
      borderBottom: isEditMode ? undefined : 'none'
    }
  },
  select: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: isEditMode ? undefined : 'none'
    },
    '& .MuiSelect-select': {
      padding: isEditMode ? undefined : '0',
      '-webkit-text-fill-color': 'rgba(0, 0, 0, 1)',
    }
  }
});