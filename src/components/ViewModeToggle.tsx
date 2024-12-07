import { FC } from 'react'
import {
  Box, styled,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';

interface Props {
  isEditMode: boolean;
  onToggle: () => void;
}

const ViewModeToggle: FC<Props> = ({ isEditMode, onToggle }) => {
  const NoPrint = styled(Box)`
    @media print {
      display: none !important;
    }
  `;

  return (
    <NoPrint
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000,
        backgroundColor: 'white',
        boxShadow: 2,
        borderRadius: 1
      }}
    >
      <ToggleButtonGroup
        exclusive
        value={isEditMode}
        onChange={onToggle}
      >
        <ToggleButton value={true}>
          <EditIcon sx={{ mr: 1 }} />
          編集
        </ToggleButton>
        <ToggleButton value={false}>
          <ViewIcon sx={{ mr: 1 }} />
          閲覧
        </ToggleButton>
      </ToggleButtonGroup>
    </NoPrint>
  );
};

export default ViewModeToggle;